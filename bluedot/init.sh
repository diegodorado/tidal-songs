#!/bin/bash
set -euf -o pipefail

tmux -2  \
  new-session -s tidal \; \
  split-window -h -t tidal \; \
  split-window -v -t tidal \; \
  select-pane -t 0 \; \
  split-window -v -t tidal \; \
  send-keys -t 0 "ghci -ghci-script ./BootTidal.hs" C-m \; \
  send-keys -t 1 "~/.vim/plugged/scvim/bin/start_pipe" C-m \; \
  send-keys -t 2 "~/Code/cpp/of/apps/myApps/retroTunnel/bin/retroTunnel &" C-m \; \
  send-keys -t 3 "python test/viewer.py" C-m \; \
  select-pane -t 0

