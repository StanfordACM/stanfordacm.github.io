#include <stdio.h>
#include <assert.h>
#include <string.h>

/* "Goes to" operator. Does exactly what you
   think it does */
void goes_to(int i) {

  while(i --> 0) {
    printf("%d\n", i);
  }
  
}

/* "Cast to boolean operator. Example counts the letters
   in a string that are not equal to the starting letter. */
void bool_cast(int boolean) {
  
  char *str = "some strings slither silently";
  int limit = strlen(str);
  
  int notsame = 0;
  int i;
  for(i = 0; i < limit; i++) {
    notsame += !!(str[0] - str[i]);
  }
  
  printf("not same: %d\n", notsame);
}

/* Prints the numbers from s to e without using loops or ifs
   (or if like constructs such as the ternary operator or
   the case statement). Makes use of the "computed goto" and
   the gcc only unary double ampersand operator. */
void print_loop(int s, int e) {
  assert(s < e);

  top:
  
  printf("%d\n", s);
  goto *( &&top + ( !!(s++/e) ) * ( &&end - &&top ) );
  
  end:
  ;
}

/* Same as above only it counts down from s to e. I included it
   so that I could combine the "goes to", the "cast to boolean"
   and the label value operator into one example. The cast to
   boolean is not technically necessary here given that the
   greater than operator returns 0 or 1 already, but I think
   that it is semantically more correct to assume any non-zero
   true vaule is possible.  */
void print_loop_reverse(int s, int e) {
  assert(s > e);
  
  top:
  
  printf("%d\n", s);
  goto *( &&top + ( !!!( s --> e) ) * ( &&end - &&top ) );
  
  end:
  ;
}

int main() {
  goes_to(10);
  bool_cast(3);
  print_loop(0,100);
  print_loop_reverse(100, 0);
}
















