import os


def read_files():
    files = os.listdir('./data/input/')
    result = []
    for file_ in files:
        if "param" in file_:
            if "ans" in file_:
                grid_search(file_, True)
            else:
                grid_search(file_, False)

    return result


def grid_search(file_name, answerer=False):
    if answerer:
        abs_file_name = os.path.join('./data/input/', file_name)
        file_name = file_name.split(".")[0]
        # grid_search for answer
        for alpha_q in range(14, 15, 1):
            for alpha_a in range(4, 6, 1):
                for beta in [.5]:
                    os.system(
                        f"webppl data_analysis.wppl --require ./qa -- --alpha_q {alpha_q} --alpha_a {alpha_a} --beta_a {beta} --run_answer 1 --file {abs_file_name} >> data/output/{file_name}.txt")
    else:
        abs_file_name = os.path.join('./data/input/', file_name)
        file_name = file_name.split(".")[0]
        # grid search for question
        for alpha_q in range(14, 15, 1):
            for alpha_a in range(4, 6, 1):
                for beta in [.1]:
                    os.system(
                        f"webppl data_analysis.wppl --require ./qa -- --alpha_q {alpha_q} --alpha_a {alpha_a} --beta_a {beta} --run_question 1 --file {abs_file_name} >> data/output/{file_name}.txt")


if __name__ == "__main__":
    read_files()