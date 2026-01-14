# Stripcode V9 Engine Protocol Description

## Overview
The Stripcode V9 engine generates substrate-compatible optical barcodes designed for high-density horizontal integration (e.g., ticket spines, document margins). It uses an adaptive topology that flows like text rather than a fixed square matrix.

## Physical Architecture
The protocol is based on a fixed 8-row height matrix, where each column represents one byte of vertical data.

### Row Matrix Definition
| Row | Function | Description |
| :--- | :--- | :--- |
| **R0** | Clock A | Alternating 1/0 signal for primary grid alignment. |
| **R1** | Data 8 | MSB of the data nibble. |
| **R2** | Data 4 | Bit 2 of the data nibble. |
| **R3** | Data 2 | Bit 1 of the data nibble. |
| **R4** | Data 1 | LSB of the data nibble. |
| **R5** | Parity | Vertical XOR checksum of R1-R4. |
| **R6** | Separator | Always 0 (Quiet track), used to visually separate data from timeline. |
| **R7** | Timeline | Complex track containing Sync bursts and Absolute Position data. |

## Packet Structure
Each Stripcode sequence is divided into "Chunks" based on the available width of the container.

1.  **Finder Left (3 Cols)**: Dynamic Start Marker. Pattern changes for First Chunk vs Intermediate.
2.  **Quiet Zone Left (1 Col)**: Empty buffer.
3.  **Metadata (4 Cols)**: Encodes `Chunk Index` and `Total Chunks`.
4.  **Payload (Variable)**: Split-byte data nibbles encoding the text string.
5.  **ECC Block (Variable)**: Rolling Hash Error Correction (~25% overhead).
6.  **Quiet Zone Right (1 Col)**: Empty buffer.
7.  **Finder Right (2 Cols)**: End anchor. Pattern indicates EOF (End of File) or Parity.

## R7 Timeline Logic
Unlike traditional barcodes, V9 uses Row 7 to encode absolute geolocation data asynchronously to the payload.

Cycle Length: **19 Columns**
*   **Cols 1-12**: Standard Clock (Inverse of R0) for skew correction.
*   **Cols 13-15**: SYNC Burst `[1, 1, 1]`. Violation of clock rule to signal frame start.
*   **Cols 16-19**: Position Nibble (4 bits). Encodes the normalized horizontal position (0-15) of the current segment within the total message.

## Capacity Solving
The engine dynamically calculates `N` (Payload Capacity) based on:
`Available Pixels / (Height / 8) - Overhead`

It iteratively solves for `N + K (ECC) <= Useful Space`.
