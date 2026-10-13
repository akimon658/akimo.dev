{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
        playwrightCli = pkgs.buildNpmPackage rec {
          pname = "playwright-cli";
          version = "0.1.21";
          src = pkgs.fetchFromGitHub {
            owner = "microsoft";
            repo = "playwright-cli";
            rev = "v${version}";
            hash = "sha256-ZHfQBZQejJKNYfhszd99i4GIzEpomBzX0/HkMK2T8DQ=";
          };
          dontNpmBuild = true;
          npmDepsHash = "sha256-aTn5CFeAzoH4J+TYiM4HOULzWAeyU3xmD4wkQdsJrGY=";
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            deno
            playwrightCli
          ];
        };
      }
    );
}
