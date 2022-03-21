/* eslint-disable no-template-curly-in-string */
import { InlinePolicy, Statement } from '../../types';
import * as shared from './shared-statements';

/**
 * Description for this inline policy.
 */

/**
 * Include shared Statement snippets.
 */
const includeStatements: Statement[] = [
    shared.denyCoreCloudFormationStacks,
    shared.denyCreateIamUsers,
    shared.denyRoute53Domains,
    shared.denySharedSecrets,
];

/**
 * Statements for this policy.
 */
const policyStatements: Statement[] = [
];

export const policy: InlinePolicy = {
    Version: '2012-10-17',
    Statement: [
        ...includeStatements,
        ...policyStatements,
    ],
};
