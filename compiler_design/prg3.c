#include <stdio.h>

int main() {
    char str[4];
    char bitwise[5] = {'&', '^', '~', '|'};
    char relational[4] = {'<', '>', '!', '='};
    char arithmetic[5] = {'+', '-', '*', '/', '%'};

    printf("Enter value to be identified: ");
    scanf("%3s", str);

    if (((str[0] == '&' || str[0] == '|') && str[0] == str[1]) ||
        (str[0] == '!' && str[1] == '\0')) {
        printf("It is a Logical Operator\n");
    }

    for (int i = 0; i < 4; ++i) {
        if (str[0] == relational[i] && (str[1] == '=' || str[1] == '\0')) {
            printf("It is a Relational Operator");
            break;
        }
    }

    for (int i = 0; i < 4; ++i) {
        if ((str[0] == bitwise[i] && str[1] == '\0') ||
            ((str[0] == '<' || str[0] == '>') && str[1] == str[0])) {
            printf("It is Bitwise Operator\n");
            break;
        }
    }

    if (str[0] == '?' && str[1] == ':') {
        printf("It is ternary Operator\n");
    }

    for (int i = 0; i < 5; ++i) {
        if ((str[0] == '+' || str[0] == '-') && str[0] == str[1]) {
            printf("It is unary operator\n");
            break;
        }

        else if ((str[0] == arithmetic[i] && str[1] == '=') ||
                 (str[0] == '=' && str[1] == ')')) {
            printf("It is Assignment Operator\n");
            break;
        }

        else if (str[0] == arithmetic[i] && str[1] == '\0') {
            printf("It is Arithmetic Operator\n");
            break;
        }
    }
}