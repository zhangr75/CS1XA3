#!/bin/bash
#5.5
for file in /home/zhangr75/;do
	html=$(find $file -name "*.html" |wc -l)
	javascript=$(find $file -name "*.js" |wc -l)
	css=$(find $file -name "*.css" |wc -l)
	python=$(find $file -name "*.py" |wc -l)
	haskell=$(find $file -name "*.hs" |wc -l)
	bash=$(find $file -name "*.sh" |wc -l)
	echo "HTML file: "$html" ,javescript file: "$javascript" ,css file: "$css" ,python file: "$python" ,haskell file: "$haskell" ,bash file: "$bash>count.txt
done

#5.4
git log --oneline>gitlog.log
grep -i "commit" gitlog.log>commit.txt
cut -d' ' -f1 commit.txt>merge.log
rm gitlog.log
rm commit.txt

#5.6
for file in /home/zhangr75/CS1XA3/;do
	git ls-files . –exclude-standard –others|find ./ -name "*.tmp" -exec rm '{}' \;
done

#Feature
echo "*list file meau** 1--txt 2--log 3--csv 4--html"
read -p "please input a number 1-4: " n
case $n in
    1)
        find /home/zhangr75/ -name "*.txt" -print
        ;;
    2)
        find /home/zhangr75/ -name "*.log" -print
        ;;
    3)
        find /home/zhangr75/ -name "*.csv" -print
        ;;
    4)
        find /home/zhangr75/ -name "*.html" -print
        ;;
    *)
        echo "Please input a number: 1-4"
        ;;
esac
