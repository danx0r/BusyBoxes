import sys

def calcDist(abc, xyz):
    sumsq = 0.0
    for i in range(3):
        sumsq += (abc[i] - xyz[i]) ** 2
    return sumsq ** 0.5

f = open(sys.argv[1])
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

#prove co-planar -- at least one of these combos will be the plane, and all
# the sums of the 3 coordinates for the circle will be equal
brk = False
for i in (-1, 1):
    if brk:
        break
    for j in (-1, 1):
        if brk:
            break
        for k in (-1, 1):
            summ = None
            success = True
            for pt in pts:
                sm = pt[0] * i + pt[1] * j + pt[2] * k
                if summ == None:
                    summ = sm
                else:
                    if abs(sm - summ) > 1e-10:
                        print "failed on", i, j, k, "summ:", summ, "sm:", sm
                        success = False
                        break
            if success:
                print "Yay! All points sum to", summ, "with coeffs", i, j, k
                brk = True
                break

dist = []
avdist = 0.0
for pt in pts:
    d = calcDist(avg, pt)
##    print "radius for this pt:", d
    avdist += d
    dist.append(d)

avdist /= count

print "average radius:", avdist

sumsq = 0.0
maxx = -1
minn = 9999999
for pt in pts:
    d = calcDist(avg, pt)
    maxx = max(maxx, d)
    minn = min(minn, d)
    dif = d - avdist
    sumsq += dif ** 2

dev = (sumsq/count) ** 0.5

print "minimum radius:", minn
print "max radius:", maxx
print "ratio min/max:", minn / maxx
print "standard deviation:", dev
