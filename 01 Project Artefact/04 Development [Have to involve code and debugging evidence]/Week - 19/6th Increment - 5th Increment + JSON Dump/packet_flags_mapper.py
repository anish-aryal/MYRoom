#!/usr/bin/python

# Extracting the Flags generally 3-bits
def getPacket_Flags(packet_data):
    	flag_ReservedBit = {0: "0 - Reserved bit"}
    	flag_BinaryYorN = {0: "0 - Fragment if necessary", 1: "1 - Do not fragment"}
    	flag_MoreFragments = {0: "0 - Last fragment", 1: "1 - More fragments"}

#   Extracting the 1st bit and shifting it right
    	ReservedBit = packet_data & 0x8000
    	ReservedBit >>= 15
    
#   Extracting the 2nd bit and shifting it right
   	BinaryYorN = packet_data & 0x4000
    	BinaryYorN >>= 14
    
#   get the 3rd bit and shift right
    	MoreFragments = packet_data & 0x2000
    	MoreFragments >>= 13

    	tab_format = '\n\t\t\t'
    	packet_flags = flag_ReservedBit[ReservedBit] + tab_format + flag_BinaryYorN[BinaryYorN] + tab_format + flag_MoreFragments[MoreFragments]
    	
    	return packet_flags
