export const Type = {
    INCOME: 'Income',
    EXPENSE: 'Expense'
}

export const Caption = {
    Memo: {
        Action: {
            ADD: {
                SHORT_TEXT: 'Add',
                LONG_TEXT: 'Add Memo',
                URI: "/memo/add"
            },
            EDIT: {
                SHORT_TEXT: 'Edit',
                LONG_TEXT: 'Edit Memo',
                URI: "/memo/edit/{0}"
            },
            BACK:  {
                SHORT_TEXT: 'Back',
                LONG_TEXT: 'Back',
                URI: "/memo"
            }
        },
        URI: "/memo"
    },
    BACK:  {
        SHORT_TEXT: 'Back',
        LONG_TEXT: 'Back',
        URI: "/"
    },
    SIGNIN: {
        SHORT_TEXT: 'Login',
        LONG_TEXT: 'Sign In',
        URI: "/"
    },
    SIGNUP: {
        SHORT_TEXT: 'Register',
        LONG_TEXT: 'Sign Up',
        URI: "/signup"
    }
}