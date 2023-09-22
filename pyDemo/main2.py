#https://docs.python.org/zh-cn/3/tutorial/datastructures.html#tuples-and-sequences

fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
a= fruits.count('apple')
print(a)
a= fruits.count('tangerine')
print(a)
a= fruits.index('banana')
print(a)
a= fruits.index('banana', 4)  # Find next banana starting at position 4
print(a)
a= fruits.reverse()

print(a)
print(fruits)
a= fruits.append('grape')
print(a)
print(fruits)
a= fruits.sort()
# [None, 'hello', 10] 就不可排序，因为整数不能与字符串对比
print(a)
print(fruits)
a= fruits.pop()
print(a)
print(fruits)

# 你可能已经注意到 insert, remove 或 sort 等仅修改列表的方法都不会打印返回值 -- 它们返回默认值 None。 1 这是适用于 Python 中所有可变数据结构的设计原则。


from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")           # Terry arrives
queue.append("Graham")          # Graham arrives
queue.popleft()                 # The first to arrive now leaves

queue.popleft()                 # The second to arrive now leaves

print(queue)                           # Remaining queue in order of arrival



squares = []
for x in range(10):
    squares.append(x**2)

squares
squares = list(map(lambda x: x**2, range(10)))
squares = [x**2 for x in range(10)]

# 列表推导式的方括号内包含以下内容：
# 一个表达式，后面为一个 for 子句，然后，是零个或多个 for 或 if 子句。
# 结果是由表达式依据 for 和 if 子句求值计算而得出一个新列表。 
# 举例来说，以下列表推导式将两个列表中不相等的元素组合起来：

[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
# 等价于：
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))

combs


vec = [-4, -2, 0, 2, 4]
# create a new list with the values doubled
[x*2 for x in vec]

# filter the list to exclude negative numbers
[x for x in vec if x >= 0]

# apply a function to all the elements
[abs(x) for x in vec]

# call a method on each element
freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
[weapon.strip() for weapon in freshfruit]

# create a list of 2-tuples like (number, square)
[(x, x**2,x*2) for x in range(6)]

# the tuple must be parenthesized, otherwise an error is raised
# [x, x**2 for x in range(6)]
#   File "<stdin>", line 1
#     [x, x**2 for x in range(6)]
#      ^^^^^^^
# SyntaxError: did you forget parentheses around the comprehension target?
# flatten a list using a listcomp with two 'for'
vec = [[1,2,3], [4,5,6], [7,8,9]]
[num for elem in vec for num in elem]

from math import pi
[str(round(pi, i)) for i in range(1, 6)]

matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]

[[row[i] for row in matrix] for i in range(4)]

list(zip(*matrix))
# zip(*iterables, strict=False)
# 在多个迭代器上并行迭代，从每个迭代器返回一个数据项组成元组。
for item in zip([1, 2, 3], ['sugar', 'spice', 'everything nice']):
    print(item)


# 有一种方式可以按索引而不是值从列表中移除条目: del 语句。 
# 这与返回一个值的 pop() 方法不同。
# del 语句也可用于从列表中移除切片或清空整个列表（我们之前通过将切片赋值为一个空列表实现过此操作）。 例如:    
a = [-1, 1, 66.25, 333, 333, 1234.5]
del a[0]
a

del a[2:4]
a

del a[:]
a    
# del 也可以用来删除整个变量：
del a

# range 类型相比常规 list 或 tuple 的优势在于一个 range 对象总是占用固定数量的（较小）内存，
# 不论其所表示的范围有多大（因为它只保存了 start, stop 和 step 值，并会根据需要计算具体单项或子范围的值）。

# 元组是不可变序列，通常用于储存异构数据的多项集（例如由 enumerate() 内置函数所产生的二元组）。
# 元组也被用于需要同构数据的不可变序列的情况（例如允许存储到 set 或 dict 的实例）。

# 元组与列表很像，但使用场景不同，用途也不同。元组是 immutable （不可变的），
# 一般可包含异质元素序列，通过解包（见本节下文）或索引访问（如果是 namedtuples，可以属性访问）。
# 列表是 mutable （可变的），列表元素一般为同质类型，可迭代访问。

empty = ()
singleton = 'hello',    # <-- note trailing comma
len(empty)

len(singleton)

singleton

# 构造 0 个或 1 个元素的元组比较特殊：为了适应这种情况，对句法有一些额外的改变。
# 用一对空圆括号就可以创建空元组；
# 只有一个元素的元组可以通过在这个元素后添加逗号来构建（圆括号里只有一个值的话不够明确）。
# 丑陋，但是有效。
t = 12345, 54321, 'hello!'
x, y, z = t 
# 称之为 序列解包 也是妥妥的，适用于右侧的任何序列。序列解包时，左侧变量与右侧序列元素的数量应相等。注意，多重赋值其实只是元组打包和序列解包的组合。


basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)                      # show that duplicates have been removed

'orange' in basket                 # fast membership testing

'crabgrass' in basket


# Demonstrate set operations on unique letters from two words

a = set('abracadabra')
b = set('alacazam')
print(a    )                              # unique letters in a

print(a - b)                              # letters in a but not in b

print(a | b)                              # letters in a or b or both

print(a & b)                              # letters in both a and b

print(a ^ b)                              # letters in a or b but not both
# {'c', 'd', 'r', 'a', 'b'}
# {'b', 'd', 'r'}
# {'c', 'd', 'a', 'r', 'l', 'b', 'z', 'm'}
# {'c', 'a'}
# {'m', 'b', 'd', 'r', 'l', 'z'}

a = {x for x in 'abracadabra' if x not in 'abc'}
print(a)
# {'r', 'd'}



# 可以把字典理解为 键值对 的集合，但字典的键必须是唯一的。
# 如果一个元组直接或间接地包含了任何可变对象，则不能作为键。 
tel = {'jack': 4098, 'sape': 4139}
tel['guido'] = 4127
tel

tel['jack']

del tel['sape']
tel['irv'] = 4127
tel

list(tel)

sorted(tel)

'guido' in tel

'jack' not in tel

dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{x: x**2 for x in (2, 4, 6)}
dict(sape=4139, guido=4127, jack=4098)

# 当对字典执行循环时，可以使用 items() 方法同时提取键及其对应的值。

knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)

for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)

# 同时循环两个或多个序列时，用 zip() 函数可以将其内的元素一一匹配：
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
    print('What is your {0}?  It is {1}.'.format(q, a))


for i in reversed(range(1, 10, 2)):
    print(i)


# 按指定顺序循环序列，可以用 sorted() 函数，在不改动原序列的基础上，返回一个重新的序列
basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for i in sorted(basket):
    print(i)

print(basket)

basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for f in sorted(set(basket)):
    print(f)

import math
raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
filtered_data = []
for value in raw_data:
    if not math.isnan(value):
        filtered_data.append(value)

print(filtered_data)

string1, string2, string3 = '', 'Trondheim', 'Hammer Dance'
non_null = string1 or string2 or string3
non_null