{pkgs}: {
  deps = [
    pkgs.google-cloud-sdk-gce
    pkgs.google-cloud-sdk
    pkgs.nodejs-20_x
    pkgs.python312
    pkgs.gcc
    pkgs.stdenv.cc.cc.lib
    pkgs.glibc
    pkgs.zlib
    pkgs.pkg-config
    pkgs.python312Packages.poetry
    pkgs.nodePackages.npm
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.stdenv.cc.cc.lib
      pkgs.glibc
      pkgs.zlib
    ];
  };
}
