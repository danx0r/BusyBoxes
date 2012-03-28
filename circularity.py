f = open('log.csv')
for r in f.readlines():
    xyz = r.strip().split(',')
    print xyz
