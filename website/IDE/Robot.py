# -*- coding: utf-8 -*-
import unicodedata
from naoqi import ALProxy
import time
import math


"""
class Robot_Control():
    def __init__(self,ip,name):
        print("inicializace")
        time.sleep(0.5)
    def standsit(self):
        print("standsit")
        time.sleep(0.5)
    def move(self,x,y,z):
        print("moving to: x - ",x," y - ", y, " z -",z)
        time.sleep(0.5)
    def say(self, sentence):
        print(sentence)
        time.sleep(0.5)
"""
stop = False

class Robot():
    def __init__(self, ip, port, name):
        ip = unicodedata.normalize('NFKD', ip).encode('ascii', 'ignore')
        PORT = int(port)
        self.name = name
        try:
            self.tts = ALProxy("ALTextToSpeech", ip, PORT)
            self.pos = ALProxy("ALRobotPosture", ip, PORT)
            self.mot = ALProxy("ALMotion", ip, PORT)
            self.memory = ALProxy("ALMemory",ip, PORT)
            self.sonar = ALProxy("ALSonar", ip , PORT)
            self.motion = ALProxy("ALMotion", ip, PORT)
        except Exception, e:
            print "Could not init robot"
            print "Error was: ", e

