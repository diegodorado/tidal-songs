:set -XOverloadedStrings
:set prompt ""
:set prompt-cont ""

import Sound.Tidal.Context

-- total latency = oLatency + cFrameTimespan

-- 2. enviar osc desde tidal tambien a hydra
hydra = (superdirtTarget {oLatency = 0.1, oAddress = "127.0.0.1", oPort = 9999})

sc = (superdirtTarget {oLatency = 0.1, oAddress = "127.0.0.1", oPort = 57120})

--tidal <- startMulti [hydra, sc] (defaultConfig {cFrameTimespan = 0.1})

tidal <- startTidal (superdirtTarget {oLatency = 0.3, oAddress = "127.0.0.1", oPort = 57120}) (defaultConfig {cFrameTimespan = 0.1})


:{
let p = streamReplace tidal
    hush = streamHush tidal
    list = streamList tidal
    mute = streamMute tidal
    unmute = streamUnmute tidal
    solo = streamSolo tidal
    unsolo = streamUnsolo tidal
    once = streamOnce tidal
    asap = once
    nudgeAll = streamNudgeAll tidal
    all = streamAll tidal
    resetCycles = streamResetCycles tidal
    setcps = asap . cps
    xfade i = transition tidal True (Sound.Tidal.Transition.xfadeIn 4) i
    xfadeIn i t = transition tidal True (Sound.Tidal.Transition.xfadeIn t) i
    midi c = sound "midi" # midichan c # nudge (-0.1)
    m1 = p "m1" . (|< midi 0)
    m2 = p "m2" . (|< midi 1)
    m3 = p "m3" . (|< midi 2)
    m4 = p "m4" . (|< midi 3)
    d0 = p 0 . (|< orbit 0)
    d1 = p 1 . (|< orbit 1)
    d2 = p 2 . (|< orbit 2)
    d3 = p 3 . (|< orbit 3)
    d4 = p 4 . (|< orbit 4)
    d5 = p 5 . (|< orbit 5)
    d6 = p 6 . (|< orbit 6)
    d7 = p 7 . (|< orbit 7)
    cc c n p = control (range 0 127 $ p) # midi c # ctlNum n # midicmd "control"
    dilei a t f = delay a + delayt t + delayfb f
    ns p = n (scale "dorian" p)
:}

:{
let setI = streamSetI tidal
    setF = streamSetF tidal
    setS = streamSetS tidal
    setR = streamSetI tidal
    setB = streamSetB tidal
:}

setcps 0.5

:set prompt "tidal> "
