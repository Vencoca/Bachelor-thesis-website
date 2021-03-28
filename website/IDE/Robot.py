#from naoqi import ALProxy
import time

class Robot():
    def __init__(self,ip,port,name):
        print("inicializace")
        self.name = name
        self.tts = ip
        self.pos = ip
        self.mot = ip
        self.memory = ip
        self.sonar = ip
        self.motion = ip
        time.sleep(0.5)
"""

class Robot_Control():
    def __init__(self, ip, name):
        PORT = 9559
        self.name = name
        self.tts = ALProxy("ALTextToSpeech", ip, PORT)
        self.pos = ALProxy("ALRobotPosture", ip, PORT)
        self.mot = ALProxy("ALMotion", ip, PORT)
        self.memory = ALProxy("ALMemory",ip, PORT)
        self.sonar = ALProxy("ALSonar", ip , PORT)
        self.motion = ALProxy("ALMotion", ip, PORT)
        self.posture = "Stand"
    def standsit(self):
        if self.posture == "Sit":
            self.pos.goToPosture("StandInit", 1.0)
            self.posture = "Stand"
        else:
            self.pos.goToPosture("Sit", 1.0)
            self.posture = "Sit"
    def move(self,x,y,r):
        if self.posture == "Stand": 
            self.mot.walkTo(x,y,r)
    def say(self,sentence):
        self.tts.say(sentence)
"""