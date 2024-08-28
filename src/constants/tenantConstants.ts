interface ITenants {
    [hostname: string] : string;
}

export const TENANTS_DICTIONARY: ITenants = {
    'ringadoragyman.com' : 'ringadora',
    'palestragyman.com' : 'palestra',
};

export const TENANTS_LIST : string[] = [
    'ringadora',
    'palestra'
]