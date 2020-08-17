import billboard
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

model = torch.load('trainedNet.pth')
model.eval()

def get_next():
	pass