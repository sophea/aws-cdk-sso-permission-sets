import { Environment, AccountList, GroupList } from '../types';

/**
 * The Organisation master account (where the SSO configuration resides)
 */
export const environment: Environment = {
    account: '086901938864',
    region: 'us-east-1',
    ssoInstanceArn: 'arn:aws:sso:::instance/ssoins-72232e8f3ab43c52',
};

/**
 * List of Accounts where we want to assign permission sets
 */
export const accountList: AccountList = {
    master: '848105232491',
    uat: '156056294877',
    dev: '291222699110',
    prod: '406942990662',
    dr: '467273878410',
    shared: '556421428413',
};


/**
 * List of Accounts where we want to assign permission sets
 */
export const testAccountList: AccountList = {

    testsm: '860580181767',
    // testks: '',
};


/**
 * List of Groups we want to assign permission sets to
 */
export const groupList: GroupList = {
    Developers: '90674280c2-3b1779b3-3fbb-4df5-a112-d55096e3c424',
    ReadOnly: '90674280c2-d4127a75-5b87-46d9-890e-1c85813d771c',
    DevOps_Team:'90674280c2-ee597e74-709f-448f-8e9e-5ec3598b2256',
    Infra_Team: '90674280c2-67db98b3-9744-4c28-87d3-bdda073e0598',
    AWS_ReadOnly:'90674280c2-609634a8-4fb0-45ea-857d-d2d999f97827',
    Billing_ReadOnly:'90674280c2-572d1004-6efc-465e-b037-acf9b83addf6',
    Billing_Admins:'90674280c2-6de22162-eede-4253-9018-a0bfc35d63bb',
    Org_Admins:'90674280c2-229cf8a8-6563-40b7-8078-e12a68cc1296',
    Account_Admins:'90674280c2-fefa5614-7fe4-4c74-a4ac-729a14a5d51c',
    Admin_SM:'90674280c2-692d61e1-458f-4144-8fbf-90d17565d1e5',
};
