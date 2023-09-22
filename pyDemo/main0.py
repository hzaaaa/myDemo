print(5**2)
print("123")
print(r'C:\some\name')  # note the r before the quote
s = 'supercalifragilisticexpialidocious'
s='123'
print(len(s))

# Fibonacci series:
# the sum of two elements defines the next
a, b = 0, 1
while a < 10:#注意，同一块语句的每一行的缩进相同。
  print(a)
  a, b = b, a+b
print('test' ,1)
a, b = 0, 1
while a < 1000:
    print(a, end=',')#关键字参数 end 可以取消输出后面的换行, 或用另一个字符串结尾
    a, b = b, a+b

print()


# x = int(input("Please enter an integer: "))#输入
x=1;

if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')

# Measure some strings:
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))

# Create a sample collection
users = {'Hans': 'active', 'Éléonore': 'inactive', '景太郎': 'active'}

# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status


# 内置函数 range() 用于生成等差数列
for i in range(5):
    print(i)
    
print(list(range(5, 10)))


print(list(range(0, 10, 3)))


print(list(range(-10, -100, -30)))
print(sum(range(4)))