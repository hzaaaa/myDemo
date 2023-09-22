# https://docs.python.org/zh-cn/3/tutorial/inputoutput.html
year = 2016
event = 'Referendum'
print(f'Results of the {year} {event}')

s = 'Hello, world.'
print(str(s))

print(repr(s))

print(str(1/7))
print(repr(1/7))

x = 10 * 3.25
y = 200 * 200
s = 'The value of x is ' + repr(x) + ', and y is ' + repr(y) + '...'
print(s)

import math
print(f'The value of pi is approximately {math.pi:.3f}.')

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
for name, phone in table.items():
    print(f'{name:10} ==> {phone:10d}')

# 还有一些修饰符可以在格式化前转换值。 '!a' 应用 ascii() ，'!s' 应用 str()，'!r' 应用 repr()：
animals = 'eels'
print(f'My hovercraft is full of {animals}.')

print(f'My hovercraft is full of {animals!a}.')
print(f'My hovercraft is full of {animals!s}.')
print(f'My hovercraft is full of {animals!r}.')

# = 说明符可被用于将一个表达式扩展为表达式文本、等号再加表达式求值结果的形式。
bugs = 'roaches'
count = 13
area = 'living room'
print(f'Debugging {bugs=} {count=} {area=}')

print('We are the {} who say "{}!"'.format('knights', 'Ni'))

print('{0} and {1}'.format('spam', 'eggs'))

print('{1} and {0}'.format('spam', 'eggs'))

print('This {food} is {adjective}.'.format(
      food='spam', adjective='absolutely horrible'))

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
      'Dcab: {0[Dcab]:d}'.format(table))

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
print('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}'.format(**table))
print('Jack: {bugs}; Sjoerd: {area};'.format(**vars()))
# 与内置函数 vars() 结合使用时，这种方式非常实用，可以返回包含所有局部变量的字典。




with open('fibo.py', encoding="utf-8") as f:
    # read_data = f.read()
    # read_data = f.readline()
    # 从文件中读取多行时，可以用循环遍历整个文件对象。这种操作能高效利用内存，快速，且代码简单：
    for line in f:
      print(line, end='')
    # 如需以列表形式读取文件中的所有行，可以用 list(f) 或 f.readlines()。
    # print('read_data',read_data)

# We can check that the file has been automatically closed.
print(f.closed)

# 如果没有使用 with 关键字，则应调用 f.close() 关闭文件，即可释放文件占用的系统资源。

# 警告 调用 f.write() 时，未使用 with 关键字，或未调用 f.close()，即使程序正常退出，也**可能** 导致 f.write() 的参数没有完全写入磁盘。
import json
with open('write','r+', encoding="utf-8") as f:
  value = ('the answer', 42)
  s = str(value)  # convert the tuple to string
  # f.write(s)
  # x = [1, 'simple', 'list']
  # json.dump(x, f)
  x = json.load(f)
  print(x)
  # f.tell() 返回整数，给出文件对象在文件中的当前位置，表示为二进制模式下时从文件开始的字节数，以及文本模式下的意义不明的数字 



# print(json.dumps(x))