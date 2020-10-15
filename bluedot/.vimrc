" map leader u/i to navigate session
nmap <Leader>u :execute "silent !tmux send-keys -t 3 j" \| :redraw!<CR>
nmap <Leader>i :execute "silent !tmux send-keys -t 3 k" \| :redraw!<CR>
