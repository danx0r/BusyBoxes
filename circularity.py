def calcDist(abc, xyz):
    sumsq = 0.0
    for i in range(3):
        sumsq += (abc[i] - xyz[i]) ** 2
    return sumsq ** 0.5

f = open('log.csv')
rl = f.readlines()
count = float(len(rl))
print "count:", count
pts = []
for r in rl:
    xyz = r.strip().split(',')
    for i in range(3):
        xyz[i] = float(xyz[i])
    print xyz
    pts.append(xyz)

avg = [0.0,0.0,0.0]
for pt in pts:
    for i in range(3):
        avg[i] += pt[i]

for i in range(3):
    avg[i] /= count

print "avg:", avg

dist = []
avdist = 0.0
for pt in pts:
    d = calcDist(avg, pt)
    print "radius for this pt:", d
    avdist += d
    dist.append(d)

avdist /= count

print "average radius:", avdist

sumsq = 0.0
for pt in pts:
    d = calcDist(avg, pt)
    dif = d - avdist
    sumsq += dif ** 2

dev = (sumsq/count) ** 0.5

print "standard deviation:", dev
