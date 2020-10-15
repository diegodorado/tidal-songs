{-# LANGUAGE TypeSynonymInstances, FlexibleInstances, OverloadedStrings #-}

-- custom osc send

module UnityOsc where
import Sound.Tidal.Stream
import Sound.Tidal.Pattern
import Sound.Tidal.ParseBP
import Sound.Tidal.Stream
import Sound.Tidal.Context

tidalUnityTarget :: OSCTarget
tidalUnityTarget = OSCTarget {oName = "tidal-unity",
                          oAddress = "127.0.0.1",
                          oPort = 5000,
                          oPath = "/unity",
                          oShape = Just [
                            ("obj", Just $ VS ""),
                            ("box", Just $ VI 0),
                            ("x", Just $ VF 0),
                            ("y", Just $ VF 0),
                            ("z", Just $ VF 0),
                            ("moveX", Just $ VF 0),
                            ("moveY", Just $ VF 0),
                            ("moveZ", Just $ VF 0),
                            ("size", Just $ VF 1.0),
                            ("duration", Just $ VF 0.5),
                            ("rigid", Just $ VI 0),
                            ("screen", Just $ VI 0)
                          ],
                          oLatency = 0.1,
                          oPreamble = [],
                          oTimestamp = MessageStamp
                          }

box o = pS "obj" "box" |+| pI "box" o
voxel o = pS "obj" "voxel" |+| pI "box" o
x = pF "x"
y = pF "y"
z = pF "z"
moveX = pF "moveX"
moveY = pF "moveY"
moveZ = pF "moveZ"
duration = pF "duration"
rigid = pI "rigid"
move x y z = moveX x |+| moveY y |+| moveZ z
pos xx yy zz = x xx |+| y yy |+| z zz
plane xx yy zz = pS "obj" "plane" |+| pos xx yy zz
camera xx yy zz = pS "obj" "camera" |+| pos xx yy zz
orientation x y z = moveX x |+| moveY y |+| moveZ z
screen i = pI "screen" i
