f = open('log.csv')
rl = f.readlines()
print "count:", len(rl)
for r in rl:
    xyz = r.strip().split(',')
    print xyz
