# https://docs.python.org/zh-cn/3/tutorial/modules.html
# Fibonacci numbers module

# from fib0 import *
# 这种方式会导入所有不以下划线（_）开头的名称。
# 大多数情况下，不要用这个功能，这种方式向解释器导入了一批未知的名称，可能会覆盖已经定义的名称。
# from fibo import fib as fibA

# 模块名后使用 as 时，直接把 as 后的名称与导入模块绑定。
# print(fibA(200))

# 备注 为了保证运行效率，每次解释器会话只导入一次模块。如果更改了模块内容，必须重启解释器；
# 仅交互测试一个模块时，也可以使用 importlib.reload()，
# 例如 import importlib; importlib.reload(modulename)。


# 可以用以下方式运行 Python 模块：

# python fibo.py <arguments>
# 这项操作将执行模块里的代码，和导入模块一样，但会把 __name__ 赋值为 "__main__"。 也就是把下列代码添加到模块末尾：

# if __name__ == "__main__":
#     import sys
#     fib(int(sys.argv[1]))

# 当导入一个名为 spam 的模块时，解释器首先会搜索具有该名称的内置模块。 
# 这些模块的名称在 sys.builtin_module_names 中列出。
# 如果未找到，它将在变量 sys.path 所给出的目录列表中搜索名为 spam.py 的文件。 
# sys.path 是从这些位置初始化的:
#     被命令行直接运行的脚本所在的目录（或未指定文件时的当前目录）。

#     PYTHONPATH （目录列表，与 shell 变量 PATH 的语法一样）。

#     依赖于安装的默认值（按照惯例包括一个 site-packages 目录，由 site 模块处理）。

# 初始化后，Python 程序可以更改 sys.path。脚本所在的目录先于标准库所在的路径被搜索。
# 这意味着，脚本所在的目录如果有和标准库同名的文件，那么加载的是该目录里的，而不是标准库的。
# 这一般是一个错误，除非这样的替换是你有意为之。详见 标准模块。

# Python 对比编译版与源码的修改日期，查看编译版是否已过期，是否要重新编译。此进程完全是自动的。此外，编译模块与平台无关，因此，可在不同架构的系统之间共享相同的库。
# Python 在两种情况下不检查缓存。
#   一，从命令行直接载入的模块，每次都会重新编译，且不储存编译结果；
#   二，没有源模块，就不会检查缓存。为了让一个库能以隐藏源代码的形式分发（通过将所有源代码变为编译后的版本），
#   编译后的模块必须放在源目录而非缓存目录中，并且源目录绝不能包含同名的未编译的源模块。

import sys
# sys.ps1

# sys.ps2
# # 只有解释器用于交互模式时，才定义这两个变量。
# sys.ps1 = 'C> '

#  一些模块是内嵌到编译器里面的， 它们给一些虽并非语言核心但却内嵌的操作提供接口，要么是为了效率，要么是给操作系统基础操作例如系统调入提供接口。 
# 这些模块集是一个配置选项， 并且还依赖于底层的操作系统。 例
# 如，winreg 模块只在 Windows 系统上提供。一个特别值得注意的模块 sys，它被内嵌到每一个 Python 编译器中。
print('sys.path',sys.path)

# 变量 sys.path 是字符串列表，用于确定解释器的模块搜索路径。该变量以环境变量 PYTHONPATH 提取的默认路径进行初始化，如未设置 PYTHONPATH，则使用内置的默认路径。可以用标准列表操作修改该变量：
# sys.path.append('/ufs/guido/lib/python')

import fibo, sys
print('')
print(dir(fibo))
# fibo.fib(100)
print('')
print(dir(sys)  )
print('')
a = [1, 2, 3, 4, 5]
print(dir()  )
# 注意它列出所有类型的名称：变量，模块，函数，……。

import builtins
dir(builtins)  
# dir() 不会列出内置函数和变量的名称。这些内容的定义在标准模块 builtins 中


# import sound.effects.echo

# 注意，使用 from package import item 时，item 可以是包的子模块（或子包），也可以是包中定义的函数、类或变量等其他名称。import 语句首先测试包中是否定义了 item；如果未在包中定义，则假定 item 是模块，并尝试加载。如果找不到 item，则触发 ImportError 异常。

# 相反，使用 import item.subitem.subsubitem 句法时，除最后一项外，每个 item 都必须是包；最后一项可以是模块或包，但不能是上一项中定义的类、函数或变量。

# 使用 from sound.effects import * 时会发生什么？你可能希望它会查找并导入包的所有子模块，但事实并非如此。因为这将花费很长的时间，并且可能会产生你不想要的副作用，如果这种副作用被你设计为只有在导入某个特定的子模块时才应该发生。

# 唯一的解决办法是提供包的显式索引。import 语句使用如下惯例：如果包的 __init__.py 代码定义了列表 __all__，运行 from package import * 时，它就是被导入的模块名列表。
# 发布包的新版本时，包的作者应更新此列表。如果包的作者认为没有必要在包中执行导入 * 操作，也可以不提供此列表。例如，sound/effects/__init__.py 文件可以包含以下代码：
# __all__ = ["echo", "surround", "reverse"]
# 这意味着 from sound.effects import * 将导入 sound.effects 包的三个命名子模块。

# 请注意子模块可能会受到本地定义名称的影响。 例如，如果你在 sound/effects/__init__.py 文件中添加了一个 reverse 函数，from sound.effects import * 将只导入 echo 和 surround 这两个子模块，但 不会 导入 reverse 子模块，因为它被本地定义的 reverse 函数所遮挡:
# __all__ = [
#     "echo",      # refers to the 'echo.py' file
#     "surround",  # refers to the 'surround.py' file
#     "reverse",   # !!! refers to the 'reverse' function now !!!
# ]

# def reverse(msg: str):  # <-- this name shadows the 'reverse.py' submodule
#     return msg[::-1]    #     in the case of a 'from sound.effects import *'

# 记住，使用 from package import specific_submodule 没有任何问题！ 实际上，除了导入模块使用不同包的同名子模块之外，这种方式是推荐用法。


# 当包由多个子包构成（如示例中的 sound 包）时，可以使用绝对导入来引用同级包的子模块。 例如，如果 sound.filters.vocoder 模块需要使用 sound.effects 包中的 echo 模块，它可以使用 from sound.effects import echo。

# 你还可以编写相对导入代码，即使用 from module import name 形式的 import 语句。 这些导入使用前导点号来表示相对导入所涉及的当前包和上级包。 例如对于 surround 模块，可以使用:

# from . import echo
# from .. import formats
# from ..filters import equalizer

# 注意，相对导入基于当前模块名。因为主模块名永远是 "__main__" ，所以如果计划将一个模块用作 Python 应用程序的主模块，那么该模块内的导入语句必须始终使用绝对导入。

# sound/                          Top-level package
#       __init__.py               Initialize the sound package
#       formats/                  Subpackage for file format conversions
#               __init__.py
#               wavread.py
#               wavwrite.py
#               aiffread.py
#               aiffwrite.py
#               auread.py
#               auwrite.py
#               ...
#       effects/                  Subpackage for sound effects
#               __init__.py
#               echo.py
#               surround.py
#               reverse.py
#               ...
#       filters/                  Subpackage for filters
#               __init__.py
#               equalizer.py
#               vocoder.py
#               karaoke.py
#               ...
# from package import specific_submodule

# 包还支持一个特殊属性 __path__ 。在包的 __init__.py 中的代码被执行前，该属性被初始化为一个只含一项的列表，该项是一个字符串，是 __init__.py 所在目录的名称。可以修改此变量；这样做会改变在此包中搜索模块和子包的方式。

# 这个功能虽然不常用，但可用于扩展包中的模块集。