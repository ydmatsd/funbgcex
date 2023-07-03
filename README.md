# FunBGCeX (Fungal Biosynthetic Gene Cluster eXtractor)

## Overview
FunBGCeX is a genome mining tool for fungal natural product discovery, which detect biosynthetic proteins based on our manually curated database of fungal natural product biosynthetic gene clusters (BGCs), [FunBGCs](http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs.html). FunBGCeX can extract not only all possible BGCs from given fungal genomes but also those encoding a protein of user's interest. The extracted BGCs are provided in the GenBank format and can also be visualized using a web browser.

<img src="img/result.png" alt="FunBGCeX sample result" width=500>

## Dependencies
Install the following dependencies:
* Python (version 3.8 or higher)
* [DIAMOND](https://github.com/bbuchfink/diamond/wiki/2.-Installation) (version 2.1.7 tested)
* [HMMER](http://hmmer.org/documentation.html) (version 3.3.2 tested)

Make sure that `diamond` and HMMER executables (e.g., `hmmscan` and `hmmfetch`) are on your system $PATH.  
Note: FunBGCeX was tested on MacOS Ventura 13.4.

## Installation
`funbgcex` can be installed using pip:

```bash
$ pip install funbgcex
```

or by cloning the repository and installing:

```bash
$ git clone https://github.com/ydmatsd/funbgcex.git
...
$ cd funbgcex/
$ pip install .
```

## Usage
BGC extraction using `funbgcex` can be performed as follows:

```bash
$ funbgcex input_directory output_directory [options]
```

The `input_directory` is the path to a directory that contains GenBank files from which BGCs will be extracted. The GenBank files need to have CDS features with a translation qualifier. Do not include any non-GenBank files in the directory.  
The `output_directory` is the path to a directory in which the results will be saved.

After the BGC extraction, the output directory should have `the all_clusters` and `results` directories and the CSV file named `allBGCs.csv`. The `all_clusters` directory contains all the extracted BGCs, while the `results` directory has separate results from each GenBank file. The CSV file `allBGCs.csv` contains the information of each extracted BGC.

### Extract all possible BGCs
To extract all possible BGCs from given fungal genomes, simply run without options as follows:

```bash
$ funbgcex input_directory output_directory
```

### Extract BGCs that encode a homologue of given protein sequence(s)
To extract BGCs that encode a homologue of protein(s) of your interest, use the target mode by specifying `-m target`. First, create a fasta file containing the protein sequences, and then run the following:

```bash
$ funbgcex input_directory output_directory -m target -f fasta_file
```

### Extract BGCs that encode a protein with a selected protein family
To extract BGCs that encode a protein with a protein family/domain (Pfam) of your interest, use the pfam mode by specifying `-m pfam`:

```bash
$ funbgcex input_directory output_directory -m pfam -p Pfam_name
```















