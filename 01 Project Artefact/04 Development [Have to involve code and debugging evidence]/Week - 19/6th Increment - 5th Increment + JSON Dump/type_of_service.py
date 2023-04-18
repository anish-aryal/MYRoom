#!/usr/bin/python

#Extraction of Type of Service, i.e. TOS generally 8-bits

def getType_Of_Service(packet_data):
	
	precedence = {0: "Routine", 1: "Priority", 2: "Immediate", 3: "Flash", 4: "Flash override", 5: "CRITIC/ECP", 6: "Internetwork control", 7: "Network control"}
	delay = {0: "Normal delay", 1: "Low delay"}
	throughput = {0: "Normal throughput", 1: "High throughput"}
	reliability = {0: "Normal reliability", 1: "High reliability"}
	cost = {0: "Normal monetary cost", 1: "Minimize monetary cost"}
	
#   Extracting the 3rd bit of the header and shifting it right
    	D = packet_data & 0x10
    	D >>= 4
 
#  Extracting the 4th bit of the hedder and shifting it right
    	T = packet_data & 0x8
    	T >>= 3

#   Extracting the 5th bit of the header and shifting it right
    	R = packet_data & 0x4
    	R >>= 2
    
#   Extracting the 6th bit of the header and shifting it right
    	M = packet_data & 0x2
    	M >>= 1

#   the 7th bit is empty and shouldn't be analyzed

    	tab_format = '\n\t\t\t'
    	Type_Of_Service = precedence[packet_data >> 5] + tab_format + delay[D] + tab_format + throughput[T] + tab_format + \
            reliability[R] + tab_format + cost[M]
    	return Type_Of_Service
