{-# LANGUAGE TypeSynonymInstances, FlexibleInstances, OverloadedStrings #-}

import Sound.Tidal.Stream
import Sound.Tidal.Pattern
import Sound.Tidal.ParseBP
import Sound.Tidal.Stream
import Sound.Tidal.Context

sc = ((superdirtTarget {oLatency = 0.4, oAddress = "127.0.0.1", oPort = 57120}),[superdirtShape])

retrotunnelTarget =
  Target {oName = "retrotunnel",   -- A friendly name for the target (only used in error messages)
          oAddress = "127.0.0.1", -- The target's network address, normally "localhost"
          oPort = 12345,           -- The network port the target is listening on
          oLatency = 0.3,         -- Additional delay, to smooth out network jitter/get things in sync
          oSchedule = Live,       -- The scheduling method - see below
          oWindow = Nothing       -- Not yet used
         }

retrotunnelMap = (retrotunnelTarget, [
  OSC "/beat" $ ArgList [("beat", Nothing)]
  ,OSC "/startAudio" $ ArgList [("startAudio", Nothing)]
  ,OSC "/sides" $ ArgList [("sides", Nothing)]
  ,OSC "/variation" $ ArgList [("variation", Nothing)]
  ,OSC "/followTwist" $ ArgList [("followTwist", Nothing)]
  ,OSC "/speed" $ ArgList [("speed", Nothing)]
  ,OSC "/twist" $ ArgList [("twist", Nothing)]
  ,OSC "/radius" $ ArgList [("radius", Nothing)]
  ,OSC "/length" $ ArgList [("length", Nothing)]
  ,OSC "/offsetZ" $ ArgList [("offsetZ", Nothing)]
  ,OSC "/spacingZ" $ ArgList [("spacingZ", Nothing)]
  ,OSC "/hue" $ ArgList [("hue", Nothing)]
  ,OSC "/lineSaturation" $ ArgList [("lineSaturation", Nothing)]
  ,OSC "/lineBrightness" $ ArgList [("lineBrightness", Nothing)]
  ,OSC "/fillSaturation" $ ArgList [("fillSaturation", Nothing)]
  ,OSC "/fillBrightness" $ ArgList [("fillBrightness", Nothing)]
  ,OSC "/fillAmmount" $ ArgList [("fillAmmount", Nothing)]
  ,OSC "/blur" $ ArgList [("blur", Nothing)]
  ,OSC "/bloom" $ ArgList [("bloom", Nothing)]
  ,OSC "/feedback" $ ArgList [("feedback", Nothing)]
  ,OSC "/camLat" $ ArgList [("camLat", Nothing)]
  ,OSC "/camLng" $ ArgList [("camLng", Nothing)]
  ,OSC "/camRad" $ ArgList [("camRad", Nothing)]
  ])

beat = pI "beat"
sagan = pS "startAudio"
sides = pI "sides"
variation = pI "variation"
subdiv = pI "subdivisions"
speedZ = pF "speed"
twist = pF "twist"
followTwist = pI "followTwist"
radius = pF "radius"
length = pF "length"
spacingZ = pF "spacingZ"
offsetZ = pF "offsetZ"
hue = pF "hue"
camLat = pF "camLat"
camLng = pF "camLng"
camRad = pF "camRad"
feedback = pF "feedback"


