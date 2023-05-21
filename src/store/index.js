class User {
    isPassword = false;// password общий (если я ввожу, то другие могут пользоваться), нужно сделать индивидуальный
    currentOrders = {};
    whitList = []
}

export default new User();