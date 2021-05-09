import os

with open('paramInput.txt', 'w') as f:
    for alpha_q in range(12, 15, 1):
        for alpha_a in range(2, 4, 1):
            for beta in [.1, .5, 1]:
                os.system(f"webppl data_analysis.wppl --require ./qa -- --alpha_q {alpha_q} --alpha_q {alpha_a} --beta {beta} --run_answer 1")