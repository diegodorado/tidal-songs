#!/bin/bash
set -euf -o pipefail

tmux -2  \
  new-session -s tidal \; \
  split-window -h -t tidal \; \
  split-window -v -t tidal \; \
  send-keys -t 0 "ghci -ghci-script ./BootTidal.hs" C-m \; \
  send-keys -t 1 "~/.vim/plugged/scvim/bin/start_pipe" C-m \; \
  select-pane -t 0

