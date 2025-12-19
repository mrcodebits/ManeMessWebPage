// Plan Types Configuration
export const PLAN_TYPES = {
    // 1 Meal Plans
    FULL_TIFFIN_1M: {
        id: 'full_tiffin_1m',
        name: 'Full Tiffin (1 Meal)',
        type: 'DABBA',
        portion: 'FULL',
        mealsPerDay: 1,
        basePrice: 3000 // Monthly
    },
    HALF_TIFFIN_1M: {
        id: 'half_tiffin_1m',
        name: 'Half Tiffin (1 Meal)',
        type: 'DABBA',
        portion: 'HALF',
        mealsPerDay: 1,
        basePrice: 2000
    },
    FULL_DINEIN_1M: {
        id: 'full_dinein_1m',
        name: 'Full Dine-In (1 Meal)',
        type: 'DINE_IN',
        portion: 'FULL',
        mealsPerDay: 1,
        basePrice: 3200
    },
    HALF_DINEIN_1M: {
        id: 'half_dinein_1m',
        name: 'Half Dine-In (1 Meal)',
        type: 'DINE_IN',
        portion: 'HALF',
        mealsPerDay: 1,
        basePrice: 2200
    },

    // 2 Meal Plans (New)
    FULL_DINEIN_2M: {
        id: 'full_dinein_2m',
        name: 'Full Dine-In (2 Meals)',
        type: 'DINE_IN',
        portion: 'FULL',
        mealsPerDay: 2,
        basePrice: 5500
    },
    HALF_DINEIN_2M: {
        id: 'half_dinein_2m',
        name: 'Half Dine-In (2 Meals)',
        type: 'DINE_IN',
        portion: 'HALF',
        mealsPerDay: 2,
        basePrice: 4000
    },
    FULL_TIFFIN_2M: {
        id: 'full_tiffin_2m',
        name: 'Full Dabba (2 Meals)',
        type: 'DABBA',
        portion: 'FULL',
        mealsPerDay: 2,
        basePrice: 5000
    }
};

export const CONSTANTS = {
    WARNING_LIMIT_1M: 1, // Warn if trying to mark 2nd meal for 1M plan
    WARNING_LIMIT_2M: 2, // Warn if trying to mark 3rd meal for 2M plan
};

// Helper: Generate Readable ID
export const generateMemberId = (index) => {
    // Padded ID: M-001, M-002, etc.
    return `M-${String(index + 1).padStart(3, '0')}`;
};

// Helper: Calculate Remaining Value
export const calculateRemainingValue = (planId, tokensLeft, totalTokensInPlan) => {
    const plan = Object.values(PLAN_TYPES).find(p => p.id === planId);
    if (!plan) return 0;

    // Simple linear value: (Price / TotalTokens) * TokensLeft
    // Assuming Standard 30 days. 1 Meal = 30 tokens, 2 Meal = 60 tokens.
    // We can just use the input totalTokensInPlan to be safe.
    if (totalTokensInPlan === 0) return 0;
    const valuePerToken = plan.basePrice / totalTokensInPlan;
    return valuePerToken * tokensLeft;
};

// Helper: Convert Value to New Plan Tokens
export const calculateNewTokensFromValue = (newPlanId, value) => {
    const plan = Object.values(PLAN_TYPES).find(p => p.id === newPlanId);
    if (!plan) return 0;

    // Standard 30 day cycle for base price
    // 1 Meal Plan = 30 tokens
    // 2 Meal Plan = 60 tokens
    const standardTokens = plan.mealsPerDay * 30;
    const pricePerToken = plan.basePrice / standardTokens;

    return Math.floor(value / pricePerToken);
};

// Helper: Precise Renewal Calculation
// Helper: Precise Renewal Calculation
export const calculateRenewalDetails = (currentSub, newPlanId, latestPlans = PLAN_TYPES) => {
    // latestPlans allows passing dynamic prices from AdminContext
    const currentPlan = Object.values(latestPlans).find(p => p.id === currentSub.planId);
    const newPlan = Object.values(latestPlans).find(p => p.id === newPlanId);

    if (!newPlan) return null;

    let creditValue = 0;
    const tokensLeft = (currentSub.totalTokens || 0) - (currentSub.tokensUsed || 0);

    // Calculate Credit from Old Plan
    if (currentPlan && tokensLeft > 0) {
        // CRITICAL: Use the price the user ACTUALLY paid (subscriptionPrice) if available.
        // If not (legacy user), fall back to the CURRENT price of their plan (best guess).
        const planPriceForCredit = currentSub.subscriptionPrice || currentPlan.basePrice;

        // Price per token based on the ORIGINAL total tokens (assuming standard month if not stored)
        const pricePerToken = planPriceForCredit / (currentSub.totalTokens || (currentPlan.mealsPerDay * 30));

        creditValue = Math.round(tokensLeft * pricePerToken);
    }

    const newPlanCost = newPlan.basePrice; // Always charge current market rate for NEW plan
    const netPayable = newPlanCost - creditValue;

    return {
        creditValue,
        newPlanCost,
        netPayable, // Can be negative if downgrading substantially
        newTotalTokens: newPlan.mealsPerDay * 30, // Standard 30 days
        tokensLeft,
        planName: newPlan.name,
        // Return this so the UI can verify which price was used
        debug: { usedPrice: currentSub.subscriptionPrice || 'Legacy Fallback' }
    };
};
