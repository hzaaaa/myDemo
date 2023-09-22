#https://docs.python.org/zh-cn/3/tutorial/controlflow.html#if-statements


for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(n, 'equals', x, '*', n//x)
            break
    else:
        # loop fell through without finding a factor
        print(n, 'is a prime number')
# for 或 while 循环可以包括 else 子句。

# 在 for 循环中，else 子句会在循环成功结束最后一次迭代之后执行。

# 在 while 循环中，它会在循环条件变为假值后执行。



# 无论哪种循环，如果因为 break 而结束，那么 else 子句就 不会 执行。
# else 子句用于循环时比起 if 语句的 else 子句，更像 try 语句的。try 语句的 else 子句在未发生异常时执行，循环的 else 子句则在未发生 break 时执行。 try 语句和异常详见 异常的处理。


# pass 语句不执行任何动作。语法上需要一个语句，但程序毋需执行任何动作时，可以使用该语句。
def initlog(*args):
    pass   # Remember to implement this!
# while True:
#     pass  # Busy-wait for keyboard interrupt (Ctrl+C)
class MyEmptyClass:
    pass


def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "I'm a teapot"
        case 401 | 403 | 404:
          return "Not allowed"
        case _:
            return "Something's wrong with the internet"
print(http_error(400))
print(http_error(419))

# def pointf(point):
# # point is an (x, y) tuple
#   match point:
#     case (0, 0):
#         print("Origin")
#     case (0, y):
#         print(f"Y={y}")
#     case (x, 0):
#         print(f"X={x}")
#     case (x, y):
#         print(f"X={x}, Y={y}")
#     case _:
#        print("Not a point")
# pointf((0,0))
# pointf((0,1))
# pointf((1,0))
# pointf((1,2))
# pointf((1,2,3))



class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    __match_args__ = ('x', 'y')

def where_is(point):
    match point:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x=0, y=y):
            print(f"Y={y}")
        case Point(x=x, y=0):
            print(f"X={x}")
        case Point():
            print("Somewhere else")
        case _:
            print("Not a point")
var = 0
where_is(Point(1, var))
where_is(Point(1, y=var))
where_is(Point(x=1, y=var))
where_is(Point(y=var, x=1))
# match 再看




def fib(n):    # write Fibonacci series up to n
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

# Now call the function we just defined:
fib(2000)

fib

f = fib
f(100)
fib(0)
print(fib(0))
# return 语句返回函数的值。return 语句不带表达式参数时，返回 None。函数执行完毕退出也返回 None。

def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        ok = input(prompt)
        if ok in ('y', 'ye', 'yes'):
            return True
        if ok in ('n', 'no', 'nop', 'nope'):
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)
# print(ask_ok('test:'))

i = 5

def f(arg=i):
    print(arg)

i = 6
f()
# 默认值在 定义 作用域里的函数定义中求值，所以：
# 上例输出的是 5。

# 重要警告： 默认值只计算一次。默认值为列表、字典或类实例等可变对象时，会产生与该规则不同的结果。例如，下面的函数会累积后续调用时传递的参数：
def f(a, L=[]):
    L.append(a)
    return L

print(f(1))
print(f(2))
print(f(3))
# 不想在后续调用之间共享默认值时，应以如下方式编写函数：

def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L
# kwarg=value 形式的 关键字参数 也可以用于调用函数。函数示例如下：

def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")
# parrot(1000)                                          # 1 positional argument
# parrot(voltage=1000)                                  # 1 keyword argument
# parrot(voltage=1000000, action='VOOOOOM')             # 2 keyword arguments
# parrot(action='VOOOOOM', voltage=1000000)             # 2 keyword arguments
# parrot('a million', 'bereft of life', 'jump')         # 3 positional arguments
# parrot('a thousand', state='pushing up the daisies')  # 1 positional, 1 keyword

# 以下调用函数的方式都无效：
# parrot()                     # required argument missing
# parrot(voltage=5.0, 'dead')  # non-keyword argument after a keyword argument
# parrot(110, voltage=220)     # duplicate value for the same argument
# parrot(actor='John Cleese')  # unknown keyword argument



def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])
cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")
# 最后一个形参为 **name 形式时，接收一个字典（详见 映射类型 --- dict），
# 该字典包含与函数中已定义形参对应之外的所有关键字参数。
# **name 形参可以与 *name 形参（下一小节介绍）组合使用（*name 必须在 **name 前面），
#  *name 形参接收一个 元组，该元组包含形参列表之外的位置参数。

# def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
#       -----------    ----------     ----------
#         |             |                  |
#         |        Positional or keyword   |
#         |                                - Keyword only
#          -- Positional only

def standard_arg(arg):
    print(arg)

def pos_only_arg(arg, /):
    print(arg)

def kwd_only_arg(*, arg):
    print(arg)

def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)


def make_incrementor(n):
    return lambda x: x + n

f = make_incrementor(42)
f(0)

f(1)

pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
pairs.sort(key=lambda pair: pair[1])
pairs

