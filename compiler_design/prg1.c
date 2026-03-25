#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool isDelimiter(char ch) {
    char delimiters[] = {' ', '+', '-', '*', '/', ',', ';', '>',
                         '<', '=', '(', ')', '[', ']', '{', '}'};
    for (int i = 0; i < sizeof(delimiters); ++i) {
        if (ch == delimiters[i]) return true;
    }
    return false;
}

bool isOperator(char ch) {
    char operators[] = {'+', '-', '*', '/', '=', '<', '>'};
    for (int i = 0; i < sizeof(operators); ++i) {
        if (ch == operators[i]) return true;
    }
    return false;
}

bool validIdentifier(char* str) {
    if (!(str[0] == '_' || isalpha(str[0]))) return false;

    for (int i = 1; i < strlen(str); ++i) {
        if (!(isalpha(str[i]) || isdigit(str[i]) || str[i] == '_'))
            return false;
    }

    return true;
}

bool isKeyword(char* str) {
    char* keywords[] = {"if",       "else",    "while",  "do",       "for",
                        "continue", "break",   "int",    "float",    "char",
                        "double",   "return",  "case",   "sizeof",   "long",
                        "short",    "typedef", "switch", "unsigned", "signed",
                        "void",     "static",  "struct", "goto"};

    for (int i = 0; i < sizeof(keywords) / sizeof(keywords[0]); ++i) {
        if (strcmp(str, keywords[i]) == 0) return true;
    }
    return false;
}

bool isInteger(char* str) {
    int len = strlen(str);

    if (len == 0) return false;

    for (int i = 0; i < len; ++i) {
        if (i == 0 && str[i] == '-') continue;
        if (!isdigit(str[i])) return false;
    }
    return true;
}

bool isRealNumber(char* str) {
    int len = strlen(str);

    if (len == 0) return false;
    int decimalCount = 0;

    for (int i = 0; i < len; ++i) {
        if (i == 0 && str[i] == '-') continue;

        if (str[i] == '.')
            decimalCount++;

        else if (!isdigit(str[i]))
            return false;
    }

    return decimalCount == 1;
}

char* subString(char* str, int left, int right) {
    char* subStr = (char*)malloc((right - left + 2) * sizeof(char));
    for (int i = left; i <= right; ++i) {
        subStr[i - left] = str[i];
    }
    subStr[right - left + 1] = '\0';
    return subStr;
}

void parse(char* str) {
    int left = 0, right = 0;
    int len = strlen(str);

    while (left <= right && right <= len) {
        if (!isDelimiter(str[right]) && right < len) {
            right++;
            continue;
        }

        if (isDelimiter(str[right]) && left == right) {
            if (isOperator(str[right])) {
                printf("'%c' IS AN OPERATOR\n", str[right]);
            }
            right++;
            left = right;
        }

        else if (isDelimiter(str[right]) && left != right || (left != right && right == len)) {
            char* subStr = subString(str, left, right - 1);

            if (isKeyword(subStr))
                printf("'%s' IS A KEYWORD\n", subStr);

            else if (isInteger(subStr))
                printf("'%s' IS AN INTEGER\n", subStr);

            else if (isRealNumber(subStr))
                printf("'%s' IS A REAL NUMBER\n", subStr);

            else if (validIdentifier(subStr))
                printf("'%s' IS A VALID IDENTIFIER\n", subStr);

            else
                printf("'%s' IS NOT A VALID IDENTIFIER (LEXICAL ERROR)\n", subStr);

            left = right;
            free(subStr);
        }

        else {
            break;
        }
    }
}

int main() {
    char str[100] = "int a = b + 1c; ";
    parse(str);
}
