import os

for alpha_q, alpha_a, beta in [
                                # (11, 8, 2.1),
                                # (17, 2, 2.4),
                                # (7, 8, 2.3),
                                # (16, 3, 1.8),
                                # (3, 2, 2.0),
                                # (4, 5, 2.0),
                                # (5, 4, 1.1),
                                # (19, 6, 2.5),
                                (6, 4, 1.5),
                                # (8, 1, 2.5),
                                # (5, 3, 1.8),
                                (6, 1, 2.8),
    ]:
    print(alpha_a, alpha_q, beta)
    path_a = f'./data/input/param_ans_synth_{alpha_q}_{alpha_a}_{int(beta*10)}.csv'
    path_q = f'./data/input/param_que_synth_{alpha_q}_{alpha_a}_{int(beta*10)}.csv'

    os.system(f"webppl param_retrieval.wppl --require ./qa -- --alpha_q {alpha_q} --alpha_a {alpha_a} \
        --beta {beta} --path_a {path_a} --path_q {path_q}")
