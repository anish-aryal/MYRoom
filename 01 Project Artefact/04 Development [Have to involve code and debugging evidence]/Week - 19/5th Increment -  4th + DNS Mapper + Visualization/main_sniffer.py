#!/usr/bin/env python
#-*- coding:utf-8 -*-

#Personal Network Packet Sniffer in Linux Environment



import protocol_mapper
import type_of_service
import packet_flags_mapper
import socket
import struct
import sys
import datetime


#Converting a string of 6 characters of ethernet address into a dash separated hex string

def ethernet_address (ethernet_addr_data) :
  ethernet_addr_hex = "%.2x:%.2x:%.2x:%.2x:%.2x:%.2x" % (ord(ethernet_addr_data[0]) , ord(ethernet_addr_data[1]) , ord(ethernet_addr_data[2]), ord(ethernet_addr_data[3]), ord(ethernet_addr_data[4]) , ord(ethernet_addr_data[5]))
  return ethernet_addr_hex

#creation of an INET, streaming socket.

try:
	packet_sniffer = socket.socket( socket.AF_PACKET , socket.SOCK_RAW , socket.ntohs(0x0003))
except socket.error, msg:
	print 'Socket could not be created. Error Code : ' + str(msg[0])
	print ' Message: ' + msg[1] + sys.exit()


#Reception of an IP Packet
def reception_of_data(packet_sniffer):
    packet_data = ''
    try:
        packet_data = packet_sniffer.recvfrom(65565)
    except:
        print("An error happened: ")
    return packet_data[0]



# Include IP headers
packet_data = reception_of_data(packet_sniffer)

#Length of the ethernet raw frames
ethernet_length = 14
			
#The Parsing of the ethernet header
ethernet_header = packet_data[:ethernet_length]

#parsing the ethernet frames
			
eth = struct.unpack('!6s6sH' , ethernet_header)
		
ethernet_protocol = socket.ntohs(eth[2])

# get protocol: 8 bits

while True:
	
	packet_data = packet_sniffer.recvfrom(65565)
	
	packet_data = packet_data[0]
	
	ethernet_length = 14
			
	#The Parsing of the ethernet header
	#ethernet_header = packet_data[:ethernet_length]

	#parsing the ethernet frames
			
	#eth = struct.unpack('!6s6sH' , ethernet_header)
		
	ethernet_protocol = socket.ntohs(eth[2])
	
	print("\n---------------------------------Parsed Data---------------------------------")
	print ("Packet Capture Time:\t" + str(datetime.datetime.now()))
	print'Destination MAC:\t' + ethernet_address(packet_data[0:6])
	print'Source MAC:\t\t' + ethernet_address(packet_data[6:12])
	print'Ethernet Protocol:\t' + str(ethernet_protocol)
	
	if ethernet_protocol == 8:
		
		ip_header = packet_data[ethernet_length:20+ethernet_length]
		#now unpack them :)
		ip_header_unpack = struct.unpack('!BBHHHBBH4s4s' , ip_header)
		version_IHL = ip_header_unpack[0]
		version = version_IHL >> 4
		IHL = version_IHL & 0xF
		ip_header_length = IHL * 4
		Type_Of_Service = ip_header_unpack[1]
		ttl = ip_header_unpack[5]
		ID = ip_header_unpack[3]
		packet_flags = ip_header_unpack[4]
		protocolName = ip_header_unpack[6]
		checksum = ip_header_unpack[7]
		source_address = socket.inet_ntoa(ip_header_unpack[8]);
		destination_address = socket.inet_ntoa(ip_header_unpack[9]);
		domain_address = socket.getfqdn(destination_address);
		
		print'ID:\t\t\t' + str(ID)
		print'Version :\t\t' + str(version)
		print'IP Header Length:\t' + str(IHL)
		#print("Type of Service:\t" + type_of_service.getType_Of_Service(Type_Of_Service))
		#print('Packet Flags:\t\t' +packet_flags_mapper.getPacket_Flags(packet_flags))
		print'TTL:\t\t\t' + str(ttl)
		print'Checksum:\t\t' + str(checksum)
		print'Source Address:\t\t' + str(source_address)
		print'Destination Address:\t' + str(destination_address)
		print'Domain Address:\t\t' + socket.getfqdn(destination_address)
		
		#TCP Protocol
		if protocolName == 6:
		    tcp_protocol = ip_header_length + ethernet_length
		    tcp_header = packet_data[tcp_protocol:tcp_protocol+20]

		    #Now Unpacking TCP Packet )
		    tcp_header_unpack = struct.unpack('!HHLLBBHHH' , tcp_header)
		    source_port = tcp_header_unpack[0]
		    destination_port = tcp_header_unpack[1]
		    sequence = tcp_header_unpack[2]
		    acknowledgement = tcp_header_unpack[3]
		    doff_reserved = tcp_header_unpack[4]
		    tcp_header_length = doff_reserved >> 4
		    print 'Protocol:\t\tTCP, Transmission Control Protocol'
		    print 'Source Port :\t\t' + str(source_port)
		    print 'Destination Port :\t' + str(destination_port)
		    print 'Sequence Number :\t' + str(sequence)
		    print 'Acknowledgement :\t' + str(acknowledgement)
		    print 'TCP header length :\t' + str(tcp_header_length)
		    print ("--------------------------------------------------------------------------------")

		#ICMP Protocol
		elif protocolName == 1:
			icmp_protocol=ip_header_length + ethernet_length
			icmp_header_length=4
			icmp_header=packet_data[icmp_protocol:icmp_protocol+4]
			#Now Unpacking ICMP Packet
			icmp_header_unpack= struct.unpack('!BBH' , icmp_header)
			icmp_type = icmp_header_unpack[0]
			code = icmp_header_unpack[1]
			checksum = icmp_header_unpack[2]
			print ("						")
			print ("						")
			print 'Protocol:\t\tICMP, Internet Control Message Protocol'
			print 'Type :\t\t\t' + str(icmp_type)
			print 'Code :\t\t\t' + str(code)
			print 'Checksum:\t\t' + str(checksum)
			print ("--------------------------------------------------------------------------------")
			
		#UDP Protocol
		elif protocolName == 17:
			udp_protocol = ip_header_length + ethernet_length
			udp_header_length = 8
			udp_header = packet_data[udp_protocol:udp_protocol+8]
			#now unpack them :)
			udp_header_unpack = struct.unpack('!HHHH' , udp_header)
			source_port = udp_header_unpack[0]
			destination_port = udp_header_unpack[1]
			udp_length = udp_header_unpack[2]
			checksum = udp_header_unpack[3]
			print ("							")
			print ("							")
			print 'Protocol:\t\tUDP, Universal Datagram Protocol'
			print 'Source Port:\t\t'+str(source_port)
			print 'Destination Port:\t'+str(destination_port)
			print 'Length:\t\t\t'+ str(udp_length)
			print 'Checksum:\t\t'+ str(checksum)
			print ("--------------------------------------------------------------------------------")
		
		else:
			print 'Identified Protocol:    ' + protocol_mapper.getProtocol(protocolName)
		print
