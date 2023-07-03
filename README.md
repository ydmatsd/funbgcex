# FunBGCeX (Fungal Biosynthetic Gene Cluster eXtractor)

## Overview
FunBGCeX is a genome mining tool for fungal natural product discovery, which detect biosynthetic proteins based on our manually curated database of fungal natural product biosynthetic gene clusters (BGCs), [FunBGCs](http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs.html). FunBGCeX can extract not only all possible BGCs from given fungal genomes but also those encoding a protein of user's interest. The extracted BGCs are provided in the GenBank format and can also be visualized using a web browser.

<img src="img/result.png" alt="FunBGCeX sample result" width=600>

## Dependencies
Install the following dependencies:
* Python (version 3.8 or higher)
* [DIAMOND](https://github.com/bbuchfink/diamond/wiki/2.-Installation) (version 2.1.7 tested)
* [HMMER](http://hmmer.org/documentation.html) (version 3.3.2 tested)

Make sure that `diamond` and HMMER executables (e.g., `hmmscan` and `hmmfetch`) are on your system $PATH.  
Note: FunBGCeX was tested on MacOS Ventura 13.4.
