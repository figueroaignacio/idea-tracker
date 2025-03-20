const aegisLog = () => {
  const reset = "\x1b[0m";
  const bold = "\x1b[1m";
  const blue = "\x1b[34m";
  const cyan = "\x1b[36m";
  const green = "\x1b[32m";

  const logo = `
    ${blue}█████╗ ███████╗ ██████╗ ██╗███████╗${reset}
   ${blue}██╔══██╗██╔════╝██╔════╝ ██║██╔════╝${reset}
   ${blue}███████║█████╗  ██║  ███╗██║███████╗${reset}
   ${blue}██╔══██║██╔══╝  ██║   ██║██║╚════██║${reset}
   ${blue}██║  ██║███████╗╚██████╔╝██║███████║${reset}
   ${blue}╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝${reset}
  `;

  const message = `
    ${bold}${green}Server ready!${reset}
    ${blue}➜${reset} Local:   ${cyan}http://localhost:${
    process.env.PORT || 3000
  }${reset}
    ${blue}➜${reset} Network: ${cyan}http://192.168.1.1:${
    process.env.PORT || 3000
  }${reset}
  `;

  console.log(logo);
  console.log(message);
};

export default aegisLog;
