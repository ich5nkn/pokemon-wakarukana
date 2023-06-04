import { BallContent } from "@/constants/balls";
import { VERSIONS } from "@/constants/version";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Flex, Text, Box } from "@chakra-ui/react";

export const BallSetting = ({ ballContent }: { ballContent: BallContent }) => {
  const { options, description } = ballContent;
  return (
    <>
      <Flex
        color={"gray.500"}
        alignItems={"center"}
        mt={-2}
        mb={6}
        p={2}
        bgColor={"gray.100"}
        borderRadius={8}
      >
        <InfoOutlineIcon mr={2} />
        <Text fontSize={"sm"}>{description}</Text>
      </Flex>
      <Box ml={2}>
        <Option title="出題数" content={`${options.numberOfQuiz}問`} />
        <Option
          title="出題形式"
          content={
            options.isChoice ? "4択" : options.isSilhouette ? "シルエット" : ""
          }
        />
        <Option title="ヒント" content={options.showHint ? "あり" : "なし"} />
        {(ballContent.options.hasRegion ||
          ballContent.options.hasAnotherForm ||
          ballContent.options.hasMega ||
          ballContent.options.hasGigantic) && (
          <>
            <Option
              title="リージョンフォーム"
              content={options.showHint ? "あり" : "なし"}
            />
            <Option
              title="フォルム違い"
              content={options.showHint ? "あり" : "なし"}
            />
            <Option
              title="メガシンカ"
              content={options.showHint ? "あり" : "なし"}
            />
            <Option
              title="キョダイマックス"
              content={options.showHint ? "あり" : "なし"}
            />
          </>
        )}
        <Option
          title="登場シリーズ"
          content={
            <>
              {options.versions
                .filter(({ value }) => value)
                .map(({ id }) => (
                  <Text key={id}>{VERSIONS[id - 1].name}</Text>
                ))}
            </>
          }
        />
      </Box>
    </>
  );
};

const Option = ({
  title,
  content,
}: {
  title: string;
  content: string | React.ReactElement;
}) => {
  if (!content) return null;
  return (
    <Box mb={2}>
      <Text fontWeight={700}>{title}</Text>
      <Box ml={2}>{content}</Box>
    </Box>
  );
};
