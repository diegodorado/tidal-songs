{-# LANGUAGE TypeSynonymInstances, FlexibleInstances, OverloadedStrings #-}

-- custom osc send

module PhoenixOsc where
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
                            ("obj",  Just $ VS ""),
                            ("note", Just $ VI 0),
                            ("speed",Just $ VF 0),
                            ("camX", Just $ VF 5),
                            ("camY", Just $ VF 0),
                            ("camZ", Just $ VF (-5))
                          ],
                          oLatency = 0.1,
                          oPreamble = [],
                          oTimestamp = MessageStamp
                          }

fenix s = pS "obj" "fenix" |+| pF "speed" s
cam x y z = pF "camX" x |+| pF "camY" y |+| pF "camZ" z
