#异常 pass
# class
#https://docs.python.org/zh-cn/3/tutorial/classes.html
d0={'a':1,'b':2}
print(d0)
print(d0['a'])

# Python 正在朝着“编译时静态名称解析”的方向发展，因此不要过于依赖动态名称解析！（局部变量已经是被静态确定了。）

# Python 有一个特殊规定。如果不存在生效的 global 或 nonlocal 语句，则对名称的赋值总是会进入最内层作用域。赋值不会复制数据，只是将名称绑定到对象。
# 删除也是如此：语句 del x 从局部作用域引用的命名空间中移除对 x 的绑定。所有引入新名称的操作都是使用局部作用域：尤其是 import 语句和函数定义会在局部作用域中绑定模块或函数名称。

def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)

# After local assignment: test spam
# After nonlocal assignment: nonlocal spam
# After global assignment: nonlocal spam
# In global scope: global spam


class Complex:
    def __init__(self, realpart, imagpart):
        self.r = realpart
        self.i = imagpart
    def f(self):
        print('self',self)
        print('hello world')
        return 
x = Complex(3.0, -4.5)
print(x.r, x.i)
#  数据属性不需要声明；就像局部变量一样，它们将在首次被赋值时产生。 举例来说，如果 x 是上面创建的 MyClass 的实例，则以下代码将打印数值 16，且不保留任何追踪信息:
x.counter = 1
while x.counter < 10:
    x.counter = x.counter * 2
print(x.counter)
del x.counter
print(repr(x))

# 实例对象的有效方法名称依赖于其所属的类。 根据定义，一个类中所有是函数对象的属性都是定义了其实例的相应方法。 
# 因此在我们的示例中，x.f 是有效的方法引用，因为 MyClass.f 是一个函数，而 x.i 不是方法，因为 MyClass.i 不是函数。 
# 但是 x.f 与 MyClass.f 并不是一回事 --- 它是一个 方法对象，不是函数对象。


x.f()
# 实际上，你可能已经猜到了答案：方法的特殊之处就在于实例对象会作为函数的第一个参数被传入。 
# 在我们的示例中，调用 x.f() 其实就相当于 MyClass.f(x)。 
# 总之，调用一个具有 n 个参数的方法就相当于调用再多一个参数的对应函数，这个参数值为方法所属实例对象，位置在其他参数之前。

# 当对实例对象进行属性引用时，如果该属性在实例中无法找到，将搜索实例所属的类。
# 如果被引用的属性名称表示一个有效的类属性中的函数对象，会打包两者（实例对象和查找到的函数对象）的指针到一个抽象对象，这个抽象对象就是方法对象。
# 当用参数列表调用方法对象时，将基于实例对象和参数列表构建一个新的参数列表，并用这个新参数列表调用相应的函数对象。


# class Dog:

#     kind = 'canine'         # class variable shared by all instances

#     def __init__(self, name):
#         self.name = name    # instance variable unique to each instance

# >>> d = Dog('Fido')
# >>> e = Dog('Buddy')
# >>> d.kind                  # shared by all dogs
# 'canine'
# >>> e.kind                  # shared by all dogs
# 'canine'
# >>> d.name                  # unique to d
# 'Fido'
# >>> e.name                  # unique to e
# 'Buddy'

# class Dog:

#     tricks = []             # mistaken use of a class variable

#     def __init__(self, name):
#         self.name = name

#     def add_trick(self, trick):
#         self.tricks.append(trick)

# >>> d = Dog('Fido')
# >>> e = Dog('Buddy')
# >>> d.add_trick('roll over')
# >>> e.add_trick('play dead')
# >>> d.tricks                # unexpectedly shared by all dogs
# ['roll over', 'play dead']

# class Dog:

#     def __init__(self, name):
#         self.name = name
#         self.tricks = []    # creates a new empty list for each dog

#     def add_trick(self, trick):
#         self.tricks.append(trick)

# >>> d = Dog('Fido')
# >>> e = Dog('Buddy')
# >>> d.add_trick('roll over')
# >>> e.add_trick('play dead')
# >>> d.tricks
# ['roll over']
# >>> e.tricks
# ['play dead']

class Bag:
    def __init__(self):
        self.data = []

    def add(self, x):
        self.data.append(x)

    def addtwice(self, x):
        self.add(x)
        self.add(x)



# 名称改写有助于让子类重载方法而不破坏类内方法调用。例如:
class Mapping:
    def __init__(self, iterable):
        self.items_list = []
        self.__update(iterable)

    def update(self, iterable):
        for item in iterable:
            self.items_list.append(item)

    __update = update   # private copy of original update() method

class MappingSubclass(Mapping):

    def update(self, keys, values):
        # provides new signature for update()
        # but does not break __init__()
        for item in zip(keys, values):
            self.items_list.append(item)


from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    dept: str
    salary: int

john = Employee('john', 'computer lab', 1000)
john.dept

john.salary

for element in [1, 2, 3]:
    print(element)
for element in (1, 2, 3):
    print(element)
for key in {'one':1, 'two':2}:
    print(key)
for char in "123":
    print(char)
# for line in open("myfile.txt"):
#     print(line, end='')

#  在幕后，for 语句会在容器对象上调用 iter()。 该函数返回一个定义了 __next__() 方法的迭代器对象，此方法将逐一访问容器中的元素。
#  当元素用尽时，__next__() 将引发 StopIteration 异常来通知终止 for 循环。 
#  你可以使用 next() 内置函数来调用 __next__() 方法；
#  这个例子显示了它的运作方式:
class Reverse:
    """Iterator for looping over a sequence backwards."""
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self):
        return self

    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]

rev = Reverse('spam')
iter(rev)

for char in rev:
    print(char)


# 生成器 是一个用于创建迭代器的简单而强大的工具。
# 它们的写法类似于标准的函数，但当它们要返回数据时会使用 yield 语句。 
# 每次在生成器上调用 next() 时，它会从上次离开的位置恢复执行（它会记住上次执行语句时的所有数据值）。 

def reverse(data):
    for index in range(len(data)-1, -1, -1):
        yield data[index]
for char in reverse('golf'):
    print(char)        
