"use client";

import axios from "axios";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { PredictionData, PredictionResponse, UseHomeReturn } from "./interface";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SCROLL_THRESHOLD = 100;

export const useHome = (): UseHomeReturn => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [search, setSearch] = useState("");
  const [data, setData] = useState<PredictionData[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [closeAlert, setCloseAlert] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setCloseAlert(!closeAlert);
  };

  const fetchPrediction = useCallback(
    async (page = 1, append = false, searchValue = "", dateValue = date) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get<PredictionResponse>(
          `${API_BASE_URL}/predictions?date=${dateValue}&search=${searchValue}&page=${page}`,
          { signal: controller.signal }
        );

        console.log({ data });
        setHasNext(data.hasNextPage);
        setPage(page);
        setData((prev) => (append ? [...prev, ...data.docs] : data.docs));
      } catch (err: unknown) {
        if (!axios.isCancel(err)) {
          let userMessage = "Something went wrong. Please try again.";

          if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
              userMessage = "No data found for your search.";
            } else if (
              err.response &&
              typeof err.response.status === "number" &&
              err.response.status >= 500
            ) {
              userMessage =
                "Server is temporarily unavailable. Please try later.";
            } else if (err.code === "ECONNABORTED") {
              userMessage = "Request timed out. Please check your connection.";
            }
          }
          setCloseAlert(true);
          setError(userMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [date]
  );

  const debouncedFetch = useMemo(
    () =>
      debounce((query: string, dateValue: string) => {
        fetchPrediction(1, false, query, dateValue);
      }, 300),
    [fetchPrediction]
  );

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    debouncedFetch(search, value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    inputRef.current?.focus();
    debouncedFetch(value, date);
  };

  useEffect(() => {
    fetchPrediction(1, false, search, date);
  }, [fetchPrediction, search, date]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasNext || loading || !containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
        fetchPrediction(page + 1, true, search, date);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNext, page, search, date, loading, fetchPrediction]);

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
      abortControllerRef.current?.abort();
    };
  }, [debouncedFetch]);

  return {
    date,
    search,
    data,
    hasNext,
    loading,
    error,
    closeAlert,
    containerRef,
    handleClose,
    handleDateChange,
    handleSearchChange,
  };
};
