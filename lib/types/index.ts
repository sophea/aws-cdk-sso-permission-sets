// Environment =============================================================

export type AccountList = {
    // name: accountnumber
    [name: string]: string,
};

export type GroupList = {
    // name: guid
    [name: string]: string,
};

export type Environment = {
    account: string,
    region: string,
    ssoInstanceArn: string,
};

// Inline Policy ===========================================================

export type Statement = {
    Sid?: string,
    Effect: 'Allow' | 'Deny',
    Action: string | string[],
    Resource: string | string[],
    Condition?: {
        [operator: string]: {
            [resource: string]: string,
        },
    },
};

export type InlinePolicy = {
    Version: string,
    Statement: Statement[],
};

// Permission Set ========================================================

type Assignment = {
    accounts: Array<keyof AccountList>;
    groups: Array<keyof GroupList>;
    includeTestAccounts?: boolean;
};

type SetDefinition = {
    name: string;
    description: string;
    sessionDuration: number; // Hours
    assignments?: Assignment[],
};

export type SetWithManagedPolicy = SetDefinition & {
    // List of AWS Managed Policy Arns
    managedPolicies: string[];
    // Custom Inline Policy JSON
    inlinePolicy?: InlinePolicy;
};

export type SetWithInlinePolicy = SetDefinition & {
    // List of AWS Managed Policy Arns
    managedPolicies?: string[];
    // Custom Inline Policy JSON
    inlinePolicy: InlinePolicy;
};
