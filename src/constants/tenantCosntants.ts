interface ITenants {
    [hostname: string] : string;
}

const tenantsDictionary: ITenants = {
    'ringadoragyman.com' : 'ringadora',
    'palestragyman.com' : 'palestra',
};
export {tenantsDictionary};

const tenantsList : string[] = [
    'ringadora',
    'palestra'
]
export {tenantsList};