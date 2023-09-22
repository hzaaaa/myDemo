# https://docs.python.org/zh-cn/3/tutorial/modules.html
# Fibonacci numbers module

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

# def fib2(n):   # return Fibonacci series up to n
#     result = []
#     a, b = 0, 1
#     while a < n:
#         result.append(a)
#         a, b = b, a+b
#     return result
# >>> import main 
# >>> main.fib(100) 
# 0 1 1 2 3 5 8 13 21 34 55 89
# >>> main.fib2(100) 
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
# >>> main.__name__ 
# 'main'
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
# 这个文件既能被用作脚本，又能被用作一个可供导入的模块，因为解析命令行参数的那两行代码只有在模块作为“main”文件执行时才会运行



