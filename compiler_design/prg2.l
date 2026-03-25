%{
#include <stdio.h>
int comment = 0;
int cnt = 0;
%}

identifier [a-zA-Z_][a-zA-Z0-9_]*

%%

[ \t\n]+                  { /* Do nothing */ }

#.*                       { if (!comment) printf("%s is a PREPROCESSOR DIRECTIVE\n", yytext); }

int|float|char|double|while|for|do|if|break|continue|void|switch|case|long|struct|const|typedef|return|else|goto { if (!comment) printf("%s is a KEYWORD\n", yytext); }

"/*"                      { comment = 1; }
"*/"                      { comment = 0; cnt++; }

{identifier}\(            { if (!comment) printf("Function %s\n", yytext); }
\{                        { if (!comment) printf("BLOCK BEGINS\n"); }
\}                        { if (!comment) printf("BLOCK ENDS\n"); }

{identifier}(\[[0-9]*\])? { if (!comment) printf("%s is an IDENTIFIER\n", yytext); }

\".*\"                    { if (!comment) printf("%s is a STRING\n", yytext); }

[0-9]+(\.[0-9]+)?         { if (!comment) printf("%s is a NUMBER\n", yytext); }

\)(\;)?                   { if (!comment) { printf("%s\n", yytext); } }
\(                        { if (!comment) { printf("%s\n", yytext); } }

=                         { if (!comment) printf("%s is an ASSIGNMENT OPERATOR\n", yytext); }
\<=|\>=|\<|==|\>          { if (!comment) printf("%s is a RELATIONAL OPERATOR\n", yytext); }

.                         { if (!comment) printf("%s is an UNRECOGNIZED TOKEN/OPERATOR\n", yytext); }

%%

int main(int argc, char* argv[]) {
    if (argc > 1) {
        FILE* file = fopen(argv[1], "r");
        if (!file) {
            printf("Could not open %s\n", argv[1]);
            return 1;
        }
        yyin = file;
    }

    yylex();

    printf("\nTotal No. of comments are %d\n", cnt);
    return 0;
}

int yywrap() { return 1; }
