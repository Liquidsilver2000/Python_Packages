import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { notes } from "../db/schema";

const STARTER_NOTES = [

  {
    title: "NumPy",
    content: `# NumPy — Numerical Computing Foundation

**NumPy** (Numerical Python) is the fundamental package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a vast collection of high-level mathematical functions to operate on these arrays.

## Core Data Structure: ndarray

The **ndarray** is NumPy's homogeneous n-dimensional array object — the backbone of the entire Python data science ecosystem.

\`\`\`python
import numpy as np

# Create arrays
a = np.array([1, 2, 3, 4, 5])
b = np.zeros((3, 3))
c = np.ones((2, 4))
d = np.random.randn(100, 5)  # Standard normal distribution
\`\`\`

## Why NumPy is Fast

| Feature | NumPy | Python Lists |
|---------|-------|--------------|
| **Vectorization** | C-level loops, no Python overhead | Element-wise Python loops |
| **Memory Layout** | Contiguous memory blocks | Scattered pointers |
| **Broadcasting** | Automatic shape alignment | Manual nested loops |
| **Type Homogeneity** | Single dtype, SIMD optimization | Mixed types, type-checking overhead |

## Broadcasting & Vectorization

\`\`\`python
# Broadcasting example
x = np.array([[1, 2, 3], [4, 5, 6]])      # shape (2, 3)
y = np.array([10, 20, 30])               # shape (3,)
result = x + y                              # shape (2, 3) — auto-broadcasted

# Vectorized statistics
mean = np.mean(data, axis=0)
std = np.std(data, axis=0)
correlation = np.corrcoef(data.T)
\`\`\`

## Linear Algebra Engine

NumPy wraps **BLAS/LAPACK** for high-performance linear algebra:

\`\`\`python
# Matrix operations
A = np.random.rand(1000, 1000)
B = np.random.rand(1000, 1000)

C = A @ B                    # Matrix multiplication (dot)
inv_A = np.linalg.inv(A)     # Matrix inverse
eigvals = np.linalg.eigvals(A)  # Eigenvalues
det = np.linalg.det(A)       # Determinant
\`\`\`

## Statistical Functions

\`\`\`python
np.mean(arr)        # Arithmetic mean
np.median(arr)      # Median
np.percentile(arr, [25, 50, 75])  # Quartiles
np.histogram(arr, bins=20)       # Histogram computation
np.fft.fft(signal)               # Fast Fourier Transform
\`\`\`

## Ecosystem Integration

- **Pandas** builds its DataFrame on top of NumPy arrays
- **Scikit-learn** expects NumPy arrays as input
- **TensorFlow** and **PyTorch** tensors are conceptually similar to ndarrays
- **Matplotlib** plots NumPy arrays directly
- **OpenCV** image arrays are NumPy arrays under the hood

> **Design Philosophy**: NumPy provides the *lingua franca* data structure that every other library in the ecosystem speaks.

See also [[Pandas]], [[Scikit-learn]], [[TensorFlow]], [[PyTorch]], [[OpenCV]]`,
    tags: ["foundation", "arrays", "linear-algebra"],
  },
  {
    title: "Pandas",
    content: `# Pandas — Data Manipulation & Analysis

**Pandas** is the quintessential data analysis library for Python. Built on top of [[NumPy]], it introduces the **DataFrame** and **Series** objects — labeled, flexible data structures that make working with structured data intuitive and efficient.

## The DataFrame: Excel Meets Python

\`\`\`python
import pandas as pd

# Create a DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'salary': [50000, 60000, 75000, 65000],
    'department': ['Engineering', 'Sales', 'Engineering', 'Marketing']
})

# Read from CSV, Excel, SQL, JSON
df_csv = pd.read_csv('data.csv')
df_excel = pd.read_excel('data.xlsx')
df_sql = pd.read_sql('SELECT * FROM users', connection)
\`\`\`

## Core Operations

### Selection & Filtering

\`\`\`python
# Column selection
ages = df['age']

# Boolean filtering
engineers = df[df['department'] == 'Engineering']
high_earners = df[df['salary'] > 60000]

# loc vs iloc
df.loc[0:2, ['name', 'salary']]    # Label-based
df.iloc[0:2, 0:3]                  # Position-based
\`\`\`

### Aggregation & Grouping

\`\`\`python
# GroupBy — the split-apply-combine paradigm
df.groupby('department')['salary'].agg(['mean', 'median', 'std'])

# Pivot tables
pd.pivot_table(df, values='salary', index='department', aggfunc='mean')

# Cross-tabulation
pd.crosstab(df['department'], df['age'] > 30)
\`\`\`

## Data Cleaning Pipeline

\`\`\`python
# Handle missing values
df.dropna()                    # Remove rows with any NaN
df.fillna(df.mean())           # Impute with mean
df.interpolate()               # Linear interpolation

# Remove duplicates
df.drop_duplicates(subset=['name'])

# Type conversion
df['age'] = df['age'].astype('int32')
df['date'] = pd.to_datetime(df['date'])
\`\`\`

## Time Series Mastery

\`\`\`python
# Datetime index
ts = pd.Series(data, index=pd.date_range('2024-01-01', periods=365, freq='D'))

# Resampling
ts.resample('M').mean()         # Monthly averages
ts.rolling(window=7).mean()     # 7-day rolling average
ts.shift(1)                     # Lagged values
\`\`\`

## Merge, Join, Concatenate

\`\`\`python
# Database-style joins
merged = pd.merge(df1, df2, on='id', how='inner')
joined = df1.join(df2, on='id')

# Stacking DataFrames
combined = pd.concat([df1, df2], axis=0)   # Vertical
side_by_side = pd.concat([df1, df2], axis=1)  # Horizontal
\`\`\`

## Integration with the Ecosystem

| Library | Integration |
|---------|-------------|
| **NumPy** | DataFrame.values returns ndarray; all NumPy ufuncs work on DataFrames |
| **Matplotlib** | df.plot() provides quick visualization |
| **Seaborn** | Accepts DataFrames directly for statistical plots |
| **Scikit-learn** | fit() accepts DataFrames; feature_names preserved |
| **SQLAlchemy** | pd.read_sql() and df.to_sql() for database I/O |
| **BeautifulSoup** | Scraped HTML tables → pd.read_html() → DataFrame |

> **Key Insight**: Pandas is the *data plumber* of the ecosystem — it ingests, transforms, and pipes data between every other library.

See also [[NumPy]], [[Matplotlib]], [[Seaborn]], [[SQLAlchemy]], [[BeautifulSoup]]`,
    tags: ["dataframe", "etl", "analysis"],
  },
  {
    title: "Matplotlib",
    content: `# Matplotlib — Data Visualization Foundation

**Matplotlib** is the grandfather of Python plotting libraries. It provides a comprehensive, low-level API for creating static, animated, and interactive visualizations. Every other Python visualization library either builds on Matplotlib or was inspired by its design.

## The Pyplot Interface

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Basic line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y, label='sin(x)', color='#2E86AB', linewidth=2)
plt.title('Sine Wave', fontsize=14)
plt.xlabel('x (radians)')
plt.ylabel('sin(x)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('sine_wave.png', dpi=150)
plt.show()
\`\`\`

## Chart Types Catalog

| Chart Type | Function | Use Case |
|------------|----------|----------|
| **Line Plot** | plt.plot() | Time series, trends |
| **Scatter Plot** | plt.scatter() | Correlations, distributions |
| **Histogram** | plt.hist() | Distribution shape |
| **Bar Chart** | plt.bar() / plt.barh() | Categorical comparison |
| **Box Plot** | plt.boxplot() | Quartiles, outliers |
| **Heatmap** | plt.imshow() | Matrix visualization |
| **Contour** | plt.contourf() | 3D surfaces in 2D |
| **Pie Chart** | plt.pie() | Proportions |

## The Object-Oriented Approach

\`\`\`python
# For complex multi-panel figures
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('Sine')

axes[0, 1].plot(x, np.cos(x))
axes[0, 1].set_title('Cosine')

axes[1, 0].hist(np.random.randn(1000), bins=30)
axes[1, 0].set_title('Normal Distribution')

axes[1, 1].scatter(np.random.rand(100), np.random.rand(100))
axes[1, 1].set_title('Random Scatter')

plt.tight_layout()
\`\`\`

## Statistical Plotting

\`\`\`python
# Error bars
plt.errorbar(x, y, yerr=error, fmt='o', capsize=4)

# Filled regions
plt.fill_between(x, y - std, y + std, alpha=0.3)

# Log scales
plt.semilogy(x, y)   # Logarithmic y-axis
plt.loglog(x, y)     # Log-log plot

# Annotations
plt.annotate('Peak', xy=(np.pi/2, 1), xytext=(3, 0.5),
             arrowprops=dict(arrowstyle='->', color='red'))
\`\`\`

## Customization & Styling

\`\`\`python
# Global style
plt.style.use('seaborn-v0_8-whitegrid')

# Custom colors
colors = plt.cm.viridis(np.linspace(0, 1, 10))  # Colormap

# LaTeX rendering
plt.rcParams['text.usetex'] = True
plt.title(r'$\alpha + \beta = \gamma$')
\`\`\`

## Animation

\`\`\`python
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots()
line, = ax.plot([], [], lw=2)

def animate(frame):
    line.set_data(x[:frame], y[:frame])
    return line,

anim = FuncAnimation(fig, animate, frames=len(x), interval=50, blit=True)
anim.save('animation.mp4', writer='ffmpeg')
\`\`\`

## Integration with the Ecosystem

- **NumPy**: Plots NumPy arrays directly; meshgrid for 2D visualizations
- **Pandas**: DataFrame.plot() is a thin wrapper around Matplotlib
- **Scikit-learn**: Confusion matrices, learning curves, ROC plots
- **OpenCV**: cv2.imshow() is an alternative; Matplotlib for publication-quality plots
- **Tkinter**: Can embed Matplotlib figures in GUI applications via FigureCanvasTkAgg

> **Pro Tip**: Use Matplotlib when you need *pixel-perfect control* over every element of your plot. For quick statistical plots, reach for [[Seaborn]].

See also [[NumPy]], [[Pandas]], [[Seaborn]], [[Scikit-learn]], [[OpenCV]], [[Tkinter]]`,
    tags: ["plots", "visualization", "charts"],
  },
  {
    title: "Seaborn",
    content: `# Seaborn — Statistical Data Visualization

**Seaborn** is a statistical visualization library built on top of [[Matplotlib]] and tightly integrated with [[Pandas]] DataFrames. It provides a high-level interface for drawing attractive, informative statistical graphics with minimal code.

## Philosophy: Statistics First

Seaborn is designed around the idea that visualization should *reveal statistical properties* of data automatically — estimating and plotting confidence intervals, fitting regression lines, and displaying distributions.

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

# Set theme
sns.set_theme(style="whitegrid", palette="viridis")

# Load example dataset
tips = sns.load_dataset("tips")
\`\`\`

## Distribution Plots

\`\`\`python
# Histogram with KDE overlay
sns.histplot(data=tips, x="total_bill", kde=True, bins=20)

# Kernel Density Estimate
sns.kdeplot(data=tips, x="total_bill", hue="time", fill=True)

# Box plot with swarm overlay
sns.boxplot(data=tips, x="day", y="total_bill")
sns.swarmplot(data=tips, x="day", y="total_bill", color="black", alpha=0.5)
\`\`\`

## Categorical Plots

\`\`\`python
# Bar plot with confidence intervals
sns.barplot(data=tips, x="day", y="total_bill", hue="sex")

# Violin plot — shows full distribution shape
sns.violinplot(data=tips, x="day", y="total_bill", hue="sex", split=True)

# Point plot — good for interactions
sns.pointplot(data=tips, x="day", y="total_bill", hue="sex")
\`\`\`

## Relationship Plots

\`\`\`python
# Scatter with regression line
sns.regplot(data=tips, x="total_bill", y="tip")

# Pair plot — all pairwise relationships
sns.pairplot(tips, hue="sex", diag_kind="kde")

# Joint plot — marginal + joint distribution
sns.jointplot(data=tips, x="total_bill", y="tip", kind="hex")
\`\`\`

## Heatmaps & Matrix Plots

\`\`\`python
# Correlation heatmap
corr = tips[['total_bill', 'tip', 'size']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0,
            square=True, linewidths=0.5)

# Cluster map — hierarchical clustering
sns.clustermap(corr, cmap='vlag', figsize=(6, 6))
\`\`\`

## Regression & Complex Models

\`\`\`python
# Linear model plot
sns.lmplot(data=tips, x="total_bill", y="tip", hue="sex", col="time")

# Residual plot to check model assumptions
sns.residplot(data=tips, x="total_bill", y="tip")
\`\`\`

## The Figure-Level API

Seaborn's modern interface uses figure-level functions that manage their own Figure:

\`\`\`python
# Figure-level scatter
sns.relplot(data=tips, x="total_bill", y="tip", hue="sex", col="day", kind="scatter")

# Figure-level distribution
sns.displot(data=tips, x="total_bill", hue="sex", col="time", kind="kde")

# Figure-level categorical
sns.catplot(data=tips, x="day", y="total_bill", hue="sex", kind="box")
\`\`\`

## Ecosystem Position

| Layer | Library | Role |
|-------|---------|------|
| **Foundation** | NumPy | Array computations |
| **Structure** | Pandas | Data organization |
| **Low-level Viz** | Matplotlib | Pixel control, backends |
| **Statistical Viz** | **Seaborn** | **Statistical estimation + aesthetics** |

- **Scikit-learn**: Plot confusion matrices, feature importances, cluster visualizations
- **TensorFlow/PyTorch**: Visualize training loss curves, weight distributions

> **When to use Seaborn**: When you want publication-ready statistical plots in 2-3 lines of code. When you need automatic confidence intervals and regression fits.

See also [[Pandas]], [[Matplotlib]], [[Scikit-learn]], [[NumPy]]`,
    tags: ["statistics", "plots", "data-viz"],
  },
  {
    title: "Scikit-learn",
    content: `# Scikit-learn — Machine Learning Toolkit

**Scikit-learn** is the most widely used machine learning library in Python. It provides simple and efficient tools for data analysis and machine learning, built on [[NumPy]], SciPy, and [[Matplotlib]]. It covers classification, regression, clustering, dimensionality reduction, model selection, and preprocessing.

## The Unified API

Scikit-learn's greatest strength is its **consistent estimator API** — every model follows the same pattern:

\`\`\`python
from sklearn import estimator
model = estimator.Estimator()   # 1. Instantiate
model.fit(X_train, y_train)       # 2. Fit
predictions = model.predict(X_test)  # 3. Predict
score = model.score(X_test, y_test)  # 4. Evaluate
\`\`\`

## Classification

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier

# Train multiple classifiers
models = {
    'Random Forest': RandomForestClassifier(n_estimators=100),
    'SVM': SVC(kernel='rbf', C=1.0),
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'KNN': KNeighborsClassifier(n_neighbors=5)
}

for name, model in models.items():
    model.fit(X_train, y_train)
    print(f"{name}: {model.score(X_test, y_test):.3f}")
\`\`\`

## Regression

\`\`\`python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import GradientBoostingRegressor

# Linear regression with regularization
ridge = Ridge(alpha=1.0)
lasso = Lasso(alpha=0.1)
gbr = GradientBoostingRegressor(n_estimators=100)

ridge.fit(X_train, y_train)
r2_score = ridge.score(X_test, y_test)
\`\`\`

## Clustering

\`\`\`python
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering

# K-Means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)

# DBSCAN — density-based clustering
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)
\`\`\`

## Preprocessing Pipeline

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Full preprocessing + model pipeline
preprocessor = ColumnTransformer([
    ('num', StandardScaler(), ['age', 'salary']),
    ('cat', OneHotEncoder(), ['department'])
])

pipeline = Pipeline([
    ('prep', preprocessor),
    ('model', RandomForestClassifier())
])

pipeline.fit(X_train, y_train)
\`\`\`

## Model Evaluation

\`\`\`python
from sklearn.model_selection import cross_val_score, GridSearchCV, train_test_split
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

# Cross-validation
scores = cross_val_score(model, X, y, cv=5)

# Hyperparameter tuning
param_grid = {'n_estimators': [50, 100, 200], 'max_depth': [3, 5, 10]}
grid = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid.fit(X_train, y_train)

# Detailed metrics
print(classification_report(y_test, y_pred))
\`\`\`

## Dimensionality Reduction

\`\`\`python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# PCA for visualization and compression
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# t-SNE for non-linear embedding
X_tsne = TSNE(n_components=2, perplexity=30).fit_transform(X)
\`\`\`

## Integration with Deep Learning

- **TensorFlow**: Use scikit-learn's train_test_split, StandardScaler before feeding to neural networks
- **PyTorch**: Same preprocessing pipeline; export sklearn models via ONNX
- **Pandas**: Directly accepts DataFrames; ColumnTransformer handles mixed types

> **Ecosystem Role**: Scikit-learn is the *workhorse* of classical machine learning. For deep learning, it serves as the preprocessing and evaluation framework that feeds [[TensorFlow]] and [[PyTorch]].

See also [[NumPy]], [[Pandas]], [[Matplotlib]], [[TensorFlow]], [[PyTorch]]`,
    tags: ["ml", "classification", "regression"],
  },
  {
    title: "TensorFlow",
    content: `# TensorFlow — Deep Learning Framework

**TensorFlow** is Google's end-to-end open-source platform for machine learning. It provides a comprehensive ecosystem of tools, libraries, and community resources for building and deploying deep learning models at scale — from research prototypes to production systems serving billions of users.

## Core Concepts

\`\`\`python
import tensorflow as tf

# Tensors — the fundamental data structure
tensor = tf.constant([[1.0, 2.0], [3.0, 4.0]])
tensor = tf.zeros([3, 3])
tensor = tf.random.normal([100, 64])

# Automatic differentiation
x = tf.Variable(3.0)
with tf.GradientTape() as tape:
    y = x ** 2 + 2 * x
dy_dx = tape.gradient(y, x)  # dy/dx = 2x + 2 = 8
\`\`\`

## Keras: The High-Level API

TensorFlow 2.x integrates **Keras** as its official high-level API:

\`\`\`python
from tensorflow import keras
from tensorflow.keras import layers

# Sequential model
model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Compile
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train
history = model.fit(X_train, y_train,
                    epochs=20,
                    batch_size=32,
                    validation_split=0.2)
\`\`\`

## Functional API: Complex Architectures

\`\`\`python
# Multi-input, multi-output model
inputs = keras.Input(shape=(784,), name='digits')
x = layers.Dense(256, activation='relu')(inputs)
x = layers.Dropout(0.4)(x)
outputs = layers.Dense(10, activation='softmax', name='predictions')(x)

model = keras.Model(inputs=inputs, outputs=outputs)
\`\`\`

## TensorFlow Ecosystem

| Component | Purpose |
|-----------|---------|
| **tf.data** | Efficient data pipelines, prefetching, parallel mapping |
| **tf.keras** | High-level model building |
| **tf.function** | Graph compilation for performance (@tf.function decorator) |
| **TensorBoard** | Visualization of training metrics, model graphs |
| **TFX** | Production ML pipeline orchestration |
| **TensorFlow Lite** | Mobile and edge deployment |
| **TensorFlow.js** | Browser-based inference |
| **TensorFlow Serving** | High-performance model serving |

## Custom Training Loop

\`\`\`python
# For research flexibility
optimizer = keras.optimizers.Adam(learning_rate=0.001)
loss_fn = keras.losses.SparseCategoricalCrossentropy()

train_dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train)).batch(32)

for epoch in range(10):
    for x_batch, y_batch in train_dataset:
        with tf.GradientTape() as tape:
            predictions = model(x_batch, training=True)
            loss = loss_fn(y_batch, predictions)
        gradients = tape.gradient(loss, model.trainable_weights)
        optimizer.apply_gradients(zip(gradients, model.trainable_weights))
\`\`\`

## Statistical Operations

\`\`\`python
# Built-in statistics
tf.reduce_mean(tensor, axis=0)
tf.math.reduce_std(tensor)
tf.math.confusion_matrix(y_true, y_pred)

# Probability distributions
dist = tf.random.normal([1000], mean=0, stddev=1)
\`\`\`

## Integration with the Ecosystem

- **NumPy**: Tensors interoperate with ndarrays; tensor.numpy() for conversion
- **Pandas**: DataFrames feed into tf.data.Dataset pipelines
- **Scikit-learn**: Use sklearn for preprocessing, train/test split; TensorFlow for the model
- **Matplotlib**: Plot training history from model.fit()
- **OpenCV**: Preprocess images with OpenCV, feed tensors to TensorFlow models

> **Design Philosophy**: TensorFlow optimizes for *production deployment* — the same code runs on laptop, server, mobile, and browser. For research flexibility, see [[PyTorch]].

See also [[NumPy]], [[Scikit-learn]], [[PyTorch]], [[OpenCV]], [[Pandas]]`,
    tags: ["deep-learning", "neural-networks", "google"],
  },
  {
    title: "PyTorch",
    content: `# PyTorch — Research-First Deep Learning

**PyTorch** is Facebook's (Meta's) open-source deep learning framework. Built on the **Torch** library with a Python frontend, PyTorch prioritizes *imperative programming*, *dynamic computation graphs*, and a Pythonic API that feels natural to researchers and developers alike.

## Tensors with Autograd

\`\`\`python
import torch

# Create tensors
t = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
t = torch.zeros(3, 3)
t = torch.randn(100, 64)

# GPU acceleration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
t = t.to(device)

# Automatic differentiation (autograd)
x = torch.tensor(2.0, requires_grad=True)
y = x ** 3 + 2 * x
y.backward()
print(x.grad)  # dy/dx = 3x^2 + 2 = 14
\`\`\`

## The nn.Module: Building Networks

\`\`\`python
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout = nn.Dropout(0.25)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        x = self.dropout(x.view(-1, 9216))
        x = F.relu(self.fc1(x))
        return self.fc2(x)

model = Net().to(device)
\`\`\`

## Training Loop (Imperative Style)

\`\`\`python
import torch.optim as optim

optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

        if batch_idx % 100 == 0:
            print(f'Epoch {epoch}, Batch {batch_idx}, Loss: {loss.item():.4f}')
\`\`\`

## PyTorch Ecosystem

| Tool | Purpose |
|------|---------|
| **torchvision** | Image datasets, transforms, pre-trained models (ResNet, VGG) |
| **torchaudio** | Audio processing and datasets |
| **torchtext** | NLP datasets and tokenization |
| **PyTorch Lightning** | High-level training loop abstraction |
| **Hugging Face Transformers** | Pre-trained NLP models built on PyTorch |
| **ONNX** | Export models for cross-platform deployment |

## Data Loading

\`\`\`python
from torch.utils.data import DataLoader, Dataset
import torchvision.transforms as transforms

# Custom dataset
class CustomDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

# DataLoader with batching, shuffling, parallel loading
dataset = CustomDataset(X, y)
loader = DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)
\`\`\`

## Statistical Distributions

\`\`\`python
# Sampling from distributions
normal = torch.randn(1000, mean=0, std=1)    # Standard normal
uniform = torch.rand(1000)                   # Uniform [0, 1)
bernoulli = torch.bernoulli(torch.ones(10) * 0.5)

# Matrix operations (same as NumPy API)
A = torch.randn(100, 100)
Q, R = torch.linalg.qr(A)
L, V = torch.linalg.eig(A)
\`\`\`

## PyTorch vs TensorFlow

| Dimension | PyTorch | TensorFlow |
|-----------|---------|------------|
| **Graph** | Dynamic (eager by default) | Static (with eager option) |
| **API Style** | Pythonic, imperative | Multi-layered (low + high) |
| **Debugging** | Standard Python debugger | tfdbg, specialized tools |
| **Research** | Preferred in academia | Strong in production |
| **Deployment** | TorchServe, ONNX, libtorch | TF Serving, TF Lite, TF.js |
| **2.x Changes** | Minimal API changes | Major Keras integration |

## Integration with the Ecosystem

- **NumPy**: Zero-copy bridge via torch.from_numpy() and .numpy()
- **Pandas**: DataFrames converted to tensors for model training
- **Scikit-learn**: Preprocessing pipelines; train/test splits
- **Matplotlib**: Plot tensors after .detach().cpu().numpy() conversion
- **OpenCV**: Image preprocessing with OpenCV, tensor conversion for PyTorch models

> **Key Insight**: PyTorch is the *researcher's choice* — its dynamic graphs and Pythonic design make experimentation fast and intuitive. For production scale, TensorFlow's static graph optimization often wins.

See also [[NumPy]], [[TensorFlow]], [[Scikit-learn]], [[OpenCV]], [[Pandas]]`,
    tags: ["pytorch", "deep-learning", "research"],
  },
  {
    title: "BeautifulSoup",
    content: `# BeautifulSoup — Web Data Extraction

**BeautifulSoup** is the standard Python library for parsing HTML and XML documents. It transforms complex, messy web pages into navigable Python objects, making it effortless to extract structured data from the web. Paired with **Requests** for HTTP fetching, it forms the complete web scraping pipeline.

## The Scraping Pipeline

\`\`\`python
import requests
from bs4 import BeautifulSoup

# Fetch a web page
url = "https://example.com/data"
headers = {"User-Agent": "DataScienceBot/1.0"}
response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()

# Parse HTML
soup = BeautifulSoup(response.content, 'html.parser')
\`\`\`

## Navigation & Search

\`\`\`python
# Find elements by tag
title = soup.find('h1').get_text()

# Find all matching elements
articles = soup.find_all('article', class_='post')

# CSS selector support
items = soup.select('.data-table tr')

# Navigate the DOM tree
parent = soup.find('div').parent
children = soup.find('div').children
next_sibling = soup.find('h2').find_next_sibling()
\`\`\`

## Extracting Structured Data

\`\`\`python
data = []
for row in soup.select('table.data tr')[1:]:
    cells = row.find_all('td')
    data.append({
        'name': cells[0].get_text(strip=True),
        'value': cells[1].get_text(strip=True),
        'date': cells[2].get_text(strip=True),
    })

# Convert to Pandas DataFrame
import pandas as pd
df = pd.DataFrame(data)
\`\`\`

## Handling Messy HTML

\`\`\`python
# BeautifulSoup fixes broken HTML automatically
broken_html = "<p>Start <b>bold</p>"
soup = BeautifulSoup(broken_html, 'html.parser')
print(soup.prettify())
# <p>Start <b>bold</b></p>

# Encoding detection
soup.original_encoding  # Detected from meta tags or HTTP headers
\`\`\`

## Advanced Parsing

\`\`\`python
# Different parsers
soup = BeautifulSoup(html, 'lxml')        # Fast, requires lxml
soup = BeautifulSoup(html, 'html.parser') # Built-in, lenient
soup = BeautifulSoup(html, 'xml')           # XML parsing

# Custom filters
def has_data_tag(tag):
    return tag.has_attr('data-id')

results = soup.find_all(has_data_tag)
\`\`\`

## Requests: The HTTP Companion

\`\`\`python
import requests

# GET with parameters
params = {'q': 'python', 'page': 1}
r = requests.get('https://api.example.com/search', params=params)

# POST with JSON payload
payload = {'key': 'value'}
r = requests.post('https://api.example.com/submit', json=payload)

# Session for persistent cookies
session = requests.Session()
session.headers.update({'Authorization': 'Bearer token123'})
r = session.get('https://api.example.com/protected')

# Handle authentication
r = requests.get(url, auth=('user', 'pass'))
\`\`\`

## Scraping Best Practices

\`\`\`python
# Respect robots.txt
# Rate limiting
import time
for url in urls:
    response = requests.get(url)
    time.sleep(1)  # Be polite

# Error handling
try:
    response = requests.get(url, timeout=10)
except requests.exceptions.RequestException as e:
    print(f"Failed to fetch {url}: {e}")
\`\`\`

## Integration with the Ecosystem

| Step | Library | Action |
|------|---------|--------|
| **Fetch** | Requests | HTTP GET/POST |
| **Parse** | BeautifulSoup | HTML → Python objects |
| **Structure** | Pandas | Python dicts → DataFrame |
| **Store** | SQLAlchemy | DataFrame → SQL database |
| **Analyze** | NumPy / Pandas | Statistical analysis |
| **Visualize** | Matplotlib / Seaborn | Charts and plots |

> **Ethical Scraping**: Always check a website's robots.txt, respect rate limits, and review terms of service. Cache results to avoid redundant requests.

See also [[Pandas]], [[SQLAlchemy]], [[NumPy]], [[Matplotlib]]`,
    tags: ["scraping", "web", "etl"],
  },
  {
    title: "SQLAlchemy",
    content: `# SQLAlchemy — Database Toolkit & ORM

**SQLAlchemy** is the most powerful and flexible SQL toolkit and Object-Relational Mapping (ORM) library for Python. It provides a full suite of well-known enterprise-level persistence patterns, designed for efficient and high-performing database access.

## Two Layers of SQLAlchemy

### Core (SQL Expression Language)

Direct, programmatic SQL construction:

\`\`\`python
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, select, func

# Connect to database
engine = create_engine('sqlite:///analytics.db')

# Define tables programmatically
metadata = MetaData()
users = Table('users', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
    Column('age', Integer)
)

# Create tables
metadata.create_all(engine)

# Insert data
with engine.connect() as conn:
    conn.execute(users.insert(), [
        {'name': 'Alice', 'age': 30},
        {'name': 'Bob', 'age': 25}
    ])
    conn.commit()

# Query with SQL expression language
stmt = select(users).where(users.c.age > 25)
with engine.connect() as conn:
    result = conn.execute(stmt)
    for row in result:
        print(row.name, row.age)
\`\`\`

### ORM (Object-Relational Mapping)

Map Python classes to database tables:

\`\`\`python
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    orders = relationship("Order", back_populates="user")

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    amount = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="orders")

# Create session
Session = sessionmaker(bind=engine)
session = Session()

# CRUD operations
alice = User(name='Alice', age=30)
session.add(alice)
session.commit()

# Query
users = session.query(User).filter(User.age > 25).all()
alice = session.query(User).filter_by(name='Alice').first()
\`\`\`

## Advanced Querying

\`\`\`python
# Aggregation
from sqlalchemy import func
result = session.query(
    User.age,
    func.count(User.id).label('count'),
    func.avg(Order.amount).label('avg_amount')
).join(Order).group_by(User.age).all()

# Subqueries
subq = session.query(func.max(User.age)).subquery()
oldest = session.query(User).filter(User.age == subq).all()

# Window functions
from sqlalchemy import over, RowNumber
stmt = select(
    User.name,
    User.age,
    func.row_number().over(order_by=User.age.desc()).label('rank')
)
\`\`\`

## Database Support

\`\`\`python
# SQLite (development, embedded)
sqlite = create_engine('sqlite:///local.db')

# PostgreSQL (production, analytics)
postgres = create_engine('postgresql://user:pass@localhost/analytics')

# MySQL
mysql = create_engine('mysql+pymysql://user:pass@localhost/analytics')

# Connection pooling
engine = create_engine('postgresql://...', pool_size=10, max_overflow=20)
\`\`\`

## Integration with Pandas

\`\`\`python
# DataFrame → SQL
df.to_sql('table_name', engine, if_exists='replace', index=False)

# SQL → DataFrame
import pandas as pd
df = pd.read_sql("SELECT * FROM users WHERE age > 25", engine)

# ORM results → DataFrame
users_df = pd.read_sql(session.query(User).statement, engine)
\`\`\`

## Async Support

\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

async_engine = create_async_engine('postgresql+asyncpg://...')
async_session = sessionmaker(async_engine, class_=AsyncSession)

async with async_session() as session:
    result = await session.execute(select(User))
    users = result.scalars().all()
\`\`\`

## Integration with the Ecosystem

- **Pandas**: Bidirectional data transfer — the bridge between in-memory analysis and persistent storage
- **Django**: Django has its own ORM, but SQLAlchemy is used for complex analytics queries within Django apps
- **NumPy**: Numeric data types mapped to SQL numeric types
- **BeautifulSoup**: Scraped data persisted to SQL via SQLAlchemy for long-term storage

> **When to use SQLAlchemy Core vs ORM**: Use **Core** for data analytics, reporting, and ETL pipelines where you think in tables and rows. Use **ORM** for application development where you think in objects and relationships.

See also [[Pandas]], [[Django]], [[BeautifulSoup]], [[NumPy]]`,
    tags: ["database", "orm", "sql"],
  },
  {
    title: "OpenCV",
    content: `# OpenCV — Computer Vision Library

**OpenCV** (Open Source Computer Vision Library) is the world's largest computer vision library, with over 2500 optimized algorithms for image and video analysis. Originally developed by Intel, it now powers everything from smartphone cameras to autonomous vehicles.

## Image I/O & Basics

\`\`\`python
import cv2
import numpy as np

# Read image (returns NumPy array)
img = cv2.imread('image.jpg')           # BGR format by default
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Image properties
print(img.shape)   # (height, width, channels)
print(img.dtype)   # uint8

# Write image
cv2.imwrite('output.png', img)
\`\`\`

## Core Operations

\`\`\`python
# Resize
resized = cv2.resize(img, (300, 300), interpolation=cv2.INTER_LANCZOS4)

# Crop (NumPy slicing)
cropped = img[100:400, 200:500]

# Rotate
(h, w) = img.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))

# Color spaces
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
\`\`\`

## Filtering & Enhancement

\`\`\`python
# Gaussian blur (noise reduction)
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# Edge detection
edges = cv2.Canny(gray, 100, 200)

# Morphological operations
kernel = np.ones((5, 5), np.uint8)
eroded = cv2.erode(binary, kernel, iterations=1)
dilated = cv2.dilate(binary, kernel, iterations=1)
\`\`\`

## Feature Detection

\`\`\`python
# Harris corner detection
corners = cv2.cornerHarris(gray, 2, 3, 0.04)

# SIFT (Scale-Invariant Feature Transform)
sift = cv2.SIFT_create()
keypoints, descriptors = sift.detectAndCompute(gray, None)

# ORB (Oriented FAST and Rotated BRIEF) — patent-free alternative
orb = cv2.ORB_create(nfeatures=500)
kp, des = orb.detectAndCompute(gray, None)
\`\`\`

## Machine Learning in OpenCV

\`\`\`python
# Haar cascades for face detection
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

# Deep learning module — load ONNX models
net = cv2.dnn.readNetFromONNX('model.onnx')
blob = cv2.dnn.blobFromImage(img, 1/255.0, (224, 224), (0, 0, 0), swapRB=True)
net.setInput(blob)
predictions = net.forward()
\`\`\`

## Video Processing

\`\`\`python
cap = cv2.VideoCapture('video.mp4')

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Process frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display
    cv2.imshow('Video', gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
\`\`\`

## NumPy Integration

OpenCV images **are** NumPy arrays — every NumPy operation works:

\`\`\`python
# Vectorized operations
brightened = np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)

# Masking
mask = np.zeros_like(gray)
mask[100:400, 200:500] = 255
masked = cv2.bitwise_and(img, img, mask=mask)

# Statistical analysis
mean_color = np.mean(img, axis=(0, 1))  # BGR mean
std_color = np.std(img, axis=(0, 1))
\`\`\`

## Ecosystem Connections

| Use Case | Pipeline |
|----------|----------|
| **ML Preprocessing** | OpenCV resize/normalize → NumPy array → PyTorch/TensorFlow tensor |
| **Data Collection** | OpenCV capture → NumPy array → Pandas → SQLAlchemy → database |
| **Visualization** | OpenCV process → convert to RGB → Matplotlib display |
| **GUI App** | OpenCV capture → process → Tkinter display + controls |
| **Web Service** | OpenCV process → base64 encode → Django API response |

> **Performance Tip**: OpenCV operations are heavily optimized with SIMD instructions. For production, compile with CUDA support for GPU acceleration on NVIDIA hardware.

See also [[NumPy]], [[PyTorch]], [[TensorFlow]], [[Matplotlib]], [[Tkinter]], [[Django]]`,
    tags: ["computer-vision", "images", "opencv"],
  },
  {
    title: "Tkinter",
    content: `# Tkinter — GUI Development

**Tkinter** is Python's standard GUI (Graphical User Interface) toolkit. It comes bundled with Python on all major platforms, making it the most accessible way to build desktop applications that interact with your data science pipelines. No pip install required.

## Basic Window

\`\`\`python
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

# Create main window
root = tk.Tk()
root.title("Data Science Dashboard")
root.geometry("800x600")

# Widgets
label = tk.Label(root, text="Welcome to DSCC", font=("Helvetica", 16))
label.pack(pady=20)

button = tk.Button(root, text="Load Dataset", command=load_data)
button.pack()

# Run
root.mainloop()
\`\`\`

## Essential Widgets

| Widget | Purpose |
|--------|---------|
| **Label** | Display text or images |
| **Button** | Trigger actions |
| **Entry** | Single-line text input |
| **Text** | Multi-line text editor |
| **Listbox** | Select from a list |
| **Combobox** | Dropdown selection (ttk) |
| **Scale** | Numeric slider |
| **Progressbar** | Show operation progress |
| **Treeview** | Tabular data display |
| **Canvas** | Drawing area — charts, images, custom graphics |

## Data Science GUI Pattern

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class DataApp:
    def __init__(self, root):
        self.root = root
        self.df = None

        # Control panel
        self.load_btn = tk.Button(root, text="Load CSV", command=self.load_csv)
        self.load_btn.pack()

        self.plot_btn = tk.Button(root, text="Plot", command=self.plot_data)
        self.plot_btn.pack()

        # Matplotlib figure embedded in Tkinter
        self.fig, self.ax = plt.subplots(figsize=(6, 4))
        self.canvas = FigureCanvasTkAgg(self.fig, master=root)
        self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

    def load_csv(self):
        path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
        if path:
            self.df = pd.read_csv(path)
            messagebox.showinfo("Success", f"Loaded {len(self.df)} rows")

    def plot_data(self):
        if self.df is None:
            messagebox.showwarning("Warning", "No data loaded")
            return
        self.ax.clear()
        self.df.hist(ax=self.ax)
        self.canvas.draw()

# Run
root = tk.Tk()
app = DataApp(root)
root.mainloop()
\`\`\`

## Advanced Layout

\`\`\`python
# Grid layout for complex dashboards
root.columnconfigure(0, weight=1)
root.rowconfigure(1, weight=1)

# Sidebar
sidebar = tk.Frame(root, width=200, bg='#f0f0f0')
sidebar.grid(row=0, column=0, rowspan=2, sticky='ns')

# Main area
main = tk.Frame(root)
main.grid(row=0, column=1, rowspan=2, sticky='nsew')

# Status bar
status = tk.Label(root, text="Ready", bd=1, relief=tk.SUNKEN, anchor=tk.W)
status.grid(row=2, column=0, columnspan=2, sticky='ew')
\`\`\`

## Threading for Long Operations

\`\`\`python
import threading

def run_analysis():
    # Run heavy computation in separate thread
    thread = threading.Thread(target=heavy_computation)
    thread.start()

def heavy_computation():
    result = complex_model.fit(X, y)
    # Update UI from main thread
    root.after(0, lambda: show_result(result))
\`\`\`

## Integration with Data Science Stack

| Library | Integration |
|---------|-------------|
| **Matplotlib** | Embed figures via FigureCanvasTkAgg |
| **Pandas** | Display DataFrames in Treeview; load/save via dialogs |
| **NumPy** | Real-time array visualization and manipulation |
| **OpenCV** | Show processed images in Tkinter Canvas |
| **Scikit-learn** | Interactive parameter tuning GUI |
| **SQLAlchemy** | Database browser and query builder interface |

> **When to use Tkinter**: For internal tools, data annotation interfaces, parameter tuning dashboards, and quick prototypes. For production desktop apps, consider PyQt or Toga. For web interfaces, see [[Django]].

See also [[Matplotlib]], [[Pandas]], [[OpenCV]], [[NumPy]], [[Django]]`,
    tags: ["gui", "desktop", "interface"],
  },
  {
    title: "Django",
    content: `# Django — Web Framework for Analytics

**Django** is Python's most popular full-stack web framework. While known for traditional web applications, it serves as an excellent backend for data science platforms — providing user authentication, REST APIs, database management, and admin interfaces that wrap your analytics pipelines.

## Project Structure

\`\`\`
analytics_platform/
├── manage.py
├── analytics_platform/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── api/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
└── dashboard/
    ├── templates/
    └── static/
\`\`\`

## Models: Data Layer

\`\`\`python
from django.db import models

class Dataset(models.Model):
    name = models.CharField(max_length=200)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='datasets/')
    row_count = models.IntegerField(default=0)
    schema = models.JSONField(default=dict)

class AnalysisResult(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    model_type = models.CharField(max_length=50)
    metrics = models.JSONField()  # accuracy, precision, recall, etc.
    created_at = models.DateTimeField(auto_now_add=True)
\`\`\`

## REST API with Django REST Framework

\`\`\`python
from rest_framework import viewsets, serializers
from rest_framework.decorators import action
from rest_framework.response import Response

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    @action(detail=True, methods=['post'])
    def analyze(self, request, pk=None):
        dataset = self.get_object()

        # Run Python analytics pipeline
        import pandas as pd
        from sklearn.ensemble import RandomForestClassifier

        df = pd.read_csv(dataset.file.path)
        X = df.drop('target', axis=1)
        y = df['target']

        model = RandomForestClassifier()
        model.fit(X, y)
        accuracy = model.score(X, y)

        return Response({'accuracy': accuracy, 'rows': len(df)})
\`\`\`

## Serving Data Science Visualizations

\`\`\`python
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
from django.http import HttpResponse
import io

def plot_view(request):
    # Generate plot
    fig, ax = plt.subplots()
    ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
    ax.set_title('Analytics Plot')

    # Return as PNG
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)

    return HttpResponse(buf, content_type='image/png')
\`\`\`

## Django + Pandas Integration

\`\`\`python
from django.core.paginator import Paginator
import pandas as pd

class DataFrameView:
    def get(self, request):
        # Read CSV into DataFrame
        df = pd.read_csv('data.csv')

        # Apply filters from query params
        if 'min_age' in request.GET:
            df = df[df['age'] >= int(request.GET['min_age'])]

        # Paginate
        paginator = Paginator(df.values.tolist(), 50)
        page = paginator.get_page(request.GET.get('page', 1))

        return JsonResponse({
            'data': list(page.object_list),
            'total': paginator.count,
            'columns': list(df.columns)
        })
\`\`\`

## Async Views for ML Inference

\`\`\`python
import asyncio
from django.http import JsonResponse
from channels.generic.http import AsyncHttpConsumer

async def predict_view(request):
    # Async ML inference
    data = json.loads(request.body)

    # Run model in thread pool to not block event loop
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, run_model, data)

    return JsonResponse({'prediction': result})
\`\`\`

## Admin Analytics Dashboard

\`\`\`python
from django.contrib import admin
from django.db.models import Count, Avg

@admin.register(AnalysisResult)
class AnalysisResultAdmin(admin.ModelAdmin):
    list_display = ['dataset', 'model_type', 'created_at']
    list_filter = ['model_type', 'created_at']

    def changelist_view(self, request, extra_context=None):
        # Add analytics to admin page
        extra_context = extra_context or {}
        extra_context['stats'] = {
            'total': AnalysisResult.objects.count(),
            'avg_accuracy': AnalysisResult.objects.filter(
                metrics__has_key='accuracy'
            ).aggregate(Avg('metrics__accuracy'))['metrics__accuracy__avg']
        }
        return super().changelist_view(request, extra_context=extra_context)
\`\`\`

## The Django Data Science Stack

| Component | Role | Integration |
|-----------|------|-------------|
| **Django ORM** | Database layer | Replaces SQLAlchemy for app data; use SQLAlchemy for analytics queries |
| **Django REST** | API layer | Serve processed data to frontend |
| **Celery** | Background tasks | Train models, process large datasets asynchronously |
| **Redis** | Cache + broker | Cache DataFrames, queue Celery tasks |
| **Channels** | WebSocket | Real-time model training progress |
| **WhiteNoise** | Static files | Serve Matplotlib/Seaborn generated plots |

> **Architecture Pattern**: Django handles *user management, persistence, and APIs*. NumPy/Pandas/Scikit-learn handle *computation*. The result is a full-stack analytics platform accessible via browser and API.

See also [[SQLAlchemy]], [[Pandas]], [[Matplotlib]], [[BeautifulSoup]], [[Scikit-learn]]`,
    tags: ["web", "framework", "backend"],
  },
  {
    title: "Ecosystem Overview",
    content: `# Data Science Ecosystem Overview

The Python data science ecosystem is not a collection of isolated libraries — it is a **cohesive, interoperable analytics pipeline** where each component serves a specific role in the journey from raw data to actionable insight.

## The Analytics Pipeline

\`\`\`
Raw Data → Ingestion → Processing → Analysis → Modeling → Visualization → Deployment
\`\`\`

| Stage | Primary Libraries | Purpose |
|-------|-------------------|---------|
| **Ingestion** | [[BeautifulSoup]], [[SQLAlchemy]], [[Pandas]] | Fetch, scrape, query, load data |
| **Processing** | [[Pandas]], [[NumPy]] | Clean, transform, reshape, normalize |
| **Analysis** | [[Pandas]], [[NumPy]], [[Scikit-learn]] | Explore, describe, cluster, reduce |
| **Modeling** | [[Scikit-learn]], [[TensorFlow]], [[PyTorch]] | Train, validate, tune, predict |
| **Visualization** | [[Matplotlib]], [[Seaborn]] | Plot, chart, communicate findings |
| **Deployment** | [[Django]], [[SQLAlchemy]] | Serve models, build APIs, persist results |
| **Interface** | [[Tkinter]], [[OpenCV]] | Build tools, process media, interact |

## Integration Patterns

### The DataFrame as Lingua Franca

Every library in this ecosystem either **produces** or **consumes** Pandas DataFrames:

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Pandas ingests data
df = pd.read_csv('data.csv')

# NumPy powers vectorized operations
df['normalized'] = (df['value'] - np.mean(df['value'])) / np.std(df['value'])

# Scikit-learn transforms features
scaler = StandardScaler()
df[['feature_1', 'feature_2']] = scaler.fit_transform(df[['feature_1', 'feature_2']])

# Matplotlib visualizes
df['normalized'].hist(bins=30)
plt.title('Distribution of Normalized Values')
plt.savefig('distribution.png')
\`\`\`

### The Array-Tensor Continuum

\`\`\`python
# NumPy → PyTorch (zero-copy when possible)
np_array = np.random.randn(100, 64)
torch_tensor = torch.from_numpy(np_array)

# PyTorch → NumPy
torch_result = model(torch_tensor)
np_result = torch_result.detach().cpu().numpy()

# OpenCV images are NumPy arrays
img = cv2.imread('image.jpg')  # np.ndarray
# Feed to PyTorch/TensorFlow directly after normalization
tensor = torch.from_numpy(img).permute(2, 0, 1).float() / 255.0
\`\`\`

### The Web-to-ML Pipeline

\`\`\`python
# BeautifulSoup scrapes web data
soup = BeautifulSoup(requests.get(url).content)
data = extract_table(soup)

# Pandas structures it
df = pd.DataFrame(data)

# SQLAlchemy persists it
engine = create_engine('postgresql://...')
df.to_sql('scraped_data', engine, if_exists='append')

# Django serves it via API
# Frontend requests → Django ORM → Pandas analysis → JSON response
\`\`\`

## Statistics-First Philosophy

This ecosystem is built on a **statistics-first** design:

1. **NumPy** provides the mathematical primitives (mean, std, covariance, FFT)
2. **Pandas** adds labeled, structured statistical operations (groupby, pivot, rolling)
3. **Seaborn** visualizes statistical estimates automatically (confidence intervals, regression lines)
4. **Scikit-learn** implements statistical learning algorithms (MLE, MAP, cross-validation)
5. **TensorFlow/PyTorch** scale statistical optimization to billions of parameters

## Library Selection Guide

| Task | First Choice | Alternative |
|------|-------------|-------------|
| Array math | [[NumPy]] | PyTorch tensors |
| Data cleaning | [[Pandas]] | Polars (Rust-based) |
| Quick plots | [[Matplotlib]] | Plotly (interactive) |
| Statistical plots | [[Seaborn]] | Plotnine (ggplot2 port) |
| Classical ML | [[Scikit-learn]] | XGBoost, LightGBM |
| Deep learning research | [[PyTorch]] | JAX (Google) |
| Production deep learning | [[TensorFlow]] | ONNX Runtime |
| Web scraping | [[BeautifulSoup]] | Scrapy (large-scale) |
| HTTP requests | Requests | httpx (async) |
| Database ORM | [[SQLAlchemy]] | Django ORM |
| Computer vision | [[OpenCV]] | Pillow (basic) |
| Desktop GUI | [[Tkinter]] | PyQt, Toga |
| Web backend | [[Django]] | FastAPI |

> **The Power of Python Data Science**: No single library does everything. The ecosystem's strength lies in seamless interoperability — each library excels at its niche, and together they form the most productive data science environment on Earth.

See all modules: [[NumPy]], [[Pandas]], [[Matplotlib]], [[Seaborn]], [[Scikit-learn]], [[TensorFlow]], [[PyTorch]], [[BeautifulSoup]], [[SQLAlchemy]], [[OpenCV]], [[Tkinter]], [[Django]]`,
    tags: ["ecosystem", "overview", "pipeline"],
  },
];

export const notesRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    let userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, ctx.user.id))
      .orderBy(desc(notes.updatedAt));

    // Auto-seed starter notes for new users
    if (userNotes.length === 0) {
      for (const starter of STARTER_NOTES) {
        await db.insert(notes).values({
          userId: ctx.user.id,
          title: starter.title,
          content: starter.content,
          tags: starter.tags,
        });
      }
      userNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, ctx.user.id))
        .orderBy(desc(notes.updatedAt));
    }

    return userNotes;
  }),

  get: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const [note] = await db
        .select()
        .from(notes)
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.user.id)));
      return note ?? null;
    }),

  create: authedQuery
    .input(
      z.object({
        title: z.string().min(1).max(500),
        content: z.string(),
        tags: z.array(z.string()).optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [note] = await db.insert(notes).values({
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        tags: input.tags ?? [],
        source: input.source ?? null,
      });
      return { id: Number(note.insertId) };
    }),

  update: authedQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(500).optional(),
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const { id, ...updates } = input;
      await db
        .update(notes)
        .set(updates)
        .where(and(eq(notes.id, id), eq(notes.userId, ctx.user.id)));
      return { success: true };
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(notes)
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.user.id)));
      return { success: true };
    }),

  deleteMany: authedQuery
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      for (const id of input.ids) {
        await db
          .delete(notes)
          .where(and(eq(notes.id, id), eq(notes.userId, ctx.user.id)));
      }
      return { success: true };
    }),

});
