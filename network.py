import billboard
import pickle
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import math, time
from torch.autograd import Variable
import matplotlib.pyplot as plt

charts = []
charts.append(billboard.ChartData('hot-100'))
charts.append(billboard.ChartData('hot-100', charts[0].previousDate))

previous = charts[0][:10]
current = charts[1][:10]

model = torch.load('bestNet.pth')
model.eval()

artists = pickle.load('artists.pickle')

def get_next():
	x = []

	for song in charts[1]:
		x.extend([artists[song.artist], song.peakPos, song.lastPos, song.weeks, song.rank, song.isNew])

	return torch.FloatTensor(np.array([x, x]))

def predict():
	outputs = model(get_next())[0]
	newPos = np.argsort(list(outputs))
	ranking = []
	for p in newPos:
		ranking.append(charts[1][p])
	
	return ranking