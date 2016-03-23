from sense_hat import SenseHat

sense = SenseHat()

t = sense.get_temperature()
p = sense.get_pressure()
h = sense.get_humidity()

t = round(t,1)
p = round(p,1)
h = round(h,1)

m = '{'

m += '"t":' + format(t) + ','
m += '"p":' + format(p) + ','
m += '"h":' + format(h) + ''

m += '}'

print "%s"%(m)




