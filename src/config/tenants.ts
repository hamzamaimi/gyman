interface Tenants {
    [hostname: string] : string;
}

const tenants: Tenants = {
    'ringadoragyman.com' : 'ringadora',
    'palestragyman.com' : 'palestra',
};

export default tenants;