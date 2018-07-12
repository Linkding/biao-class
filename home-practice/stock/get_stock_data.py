# -*- coding: utf-8 -*-
import tushare as ts
import pandas as pd

stock_num = ['601601','600519','002039','000568','600236']
stock_list = []

for code in stock_num:
    df = ts.get_k_data(code,ktype='5')
    df = df.iloc[[-1]]
    stock_list.append(df)

stock_pd = pd.concat(stock_list)

stock_pd.to_json('./'+ 'stock_info' + '.json',orient='records')

